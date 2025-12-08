import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function POST(req: NextRequest) {
  try {
    if (!PAYSTACK_SECRET) {
      console.error("Missing PAYSTACK_SECRET_KEY");
      return NextResponse.json({ error: "missing_paystack_secret" }, { status: 500 });
    }

    const body = await req.json();
    const { fullName, email, phone, quantity, format, deliveryLocation } = body;

    if (!email || !quantity || !format) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }

    // 1️⃣ INSERT FIRST INTO SUPABASE
    const insertPayload = {
      full_name: fullName || email,
      email,
      phone: phone ?? null,
      quantity: Number(quantity) || 1,
      delivery_location: deliveryLocation || null,
      amount: (Number(quantity) || 1) * 2500 * 100, // kobo
      currency: "NGN",
      paystack_reference: null,
      paystack_status: "pending",
      format,
      meta: { format, deliveryLocation }
    };

    const { data: orderData, error: insertError } = await supabaseAdmin
      .from("preorders")
      .insert(insertPayload)
      .select()
      .single();

    if (insertError) {
      console.error("Supabase insert error:", insertError);
    }

    // 2️⃣ INITIALIZE PAYSTACK
    const callbackUrl = BASE_URL
      ? `${BASE_URL}/api/paystack/callback`
      : `${req.nextUrl.origin}/api/paystack/callback`;

    const initializeRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        amount: insertPayload.amount,
        metadata: {
          order_id: orderData?.id,
          fullName,
          phone,
          quantity,
          format,
          deliveryLocation
        },
        callback_url: callbackUrl
      })
    });

    const initJson = await initializeRes.json();

    if (!initializeRes.ok || !initJson.status) {
      console.error("Paystack initialize failed:", initJson);
      return NextResponse.json({ error: "paystack_init_failed", details: initJson }, { status: 502 });
    }

    const paystackRef = initJson.data.reference;

    // 3️⃣ UPDATE SUPABASE WITH PAYSTACK REFERENCE IMMEDIATELY
    await supabaseAdmin
      .from("preorders")
      .update({ paystack_reference: paystackRef })
      .eq("id", orderData.id);

    return NextResponse.json({
      success: true,
      authorization_url: initJson.data.authorization_url,
      reference: paystackRef,
      data: initJson.data
    });

  } catch (err) {
    console.error("initialize error:", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
