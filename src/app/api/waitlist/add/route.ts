// src/app/api/waitlist/add/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, note } = body;
    if (!email || !fullName) {
      return NextResponse.json({ error: 'missing_fields' }, { status: 400 });
    }

    const payload = {
      full_name: fullName,
      email,
      phone: phone ?? null,
      note: note ?? null
    };

    const { data, error } = await supabaseAdmin.from('waitlist').insert(payload).select().single();

    if (error) {
      console.error('Waitlist insert error', error);
      return NextResponse.json({ error: 'db_error', details: error }, { status: 500 });
    }

    return NextResponse.json({ success: true, waitlist: data });
  } catch (err) {
    console.error('waitlist error', err);
    return NextResponse.json({ error: 'internal' }, { status: 500 });
  }
}
