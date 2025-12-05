// src/app/api/paystack/initialize/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export async function POST(req: NextRequest) {
  try {
    if (!PAYSTACK_SECRET) {
      console.error('Missing PAYSTACK_SECRET_KEY environment variable');
      return NextResponse.json({ error: 'missing_paystack_secret' }, { status: 500 });
    }

    const body = await req.json();
    const { fullName, email, phone, quantity, format } = body;
    if (!email || !quantity || !format) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
    }

    // create preliminary order in Supabase with status 'pending'
    const insertPayload = {
      full_name: fullName || email,
      email,
      phone: phone ?? null,
      quantity: Number(quantity) || 1,
      amount: (Number(quantity) || 1) * 2500 * 100, // default price: 2500 NGN -> in kobo
      currency: 'NGN',
      paystack_reference: null,
      paystack_status: 'pending',
      meta: { format }
    };

    const { data: orderData, error: insertError } = await supabaseAdmin
      .from('preorders')
      .insert(insertPayload)
      .select()
      .single();

    if (insertError) {
      console.error('Supabase insert error', insertError);
      // continue but warn
    }

    // initialize paystack transaction
    const callbackUrl = BASE_URL
      ? `${BASE_URL}/payment/callback`
      : `${req.nextUrl.origin}/payment/callback`;

    const initializeRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        amount: insertPayload.amount,
        metadata: {
          order_id: orderData?.id ?? null,
          fullName,
          phone,
          quantity,
          format
        },
        callback_url: callbackUrl
      })
    });

    const initJson = await initializeRes.json();

    if (!initializeRes.ok || !initJson.status || !initJson.data?.authorization_url) {
      console.error('Paystack initialize failed', initJson);
      return NextResponse.json({ error: 'paystack_init_failed', details: initJson }, { status: 502 });
    }

    // return authorization_url to client
    return NextResponse.json({
      success: true,
      authorization_url: initJson.data.authorization_url,
      reference: initJson.data.reference,
      data: initJson.data
    });
  } catch (err) {
    console.error('initialize error', err);
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}