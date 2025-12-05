//src/app/api/preorder/route.ts

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, quantity, format } = body;

    if (!fullName || !email) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("preorders")
      .insert({
        full_name: fullName,
        email,
        phone,
        quantity: quantity || 1,
        format: format || "hardcopy",
        paystack_status: "pending"
      })
      .select()
      .single();

    if (error) {
      console.error("Preorder Insert ERROR:", error);
      return NextResponse.json({ error: "db_error", details: error }, { status: 500 });
    }

    return NextResponse.json({ success: true, preorder: data });
  } catch (err) {
    console.error("Preorder API ERROR:", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
