//src/app/api/paystack/webhook/route.ts

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sendResendMail } from "@/lib/resend";
import { paymentSuccessTemplate } from "@/lib/email-template";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature") || "";

    // Verify Paystack signature
    const expected = crypto
      .createHmac("sha512", PAYSTACK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (expected !== signature) {
      console.log("❌ Invalid Paystack signature");
      return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    console.log("Paystack webhook event:", event);

    // We only care about successful payments
    if (event.event === "charge.success") {
      const d = event.data;

      const email = d.customer?.email;
      const fullName =
        [d.customer?.first_name, d.customer?.last_name]
          .filter(Boolean)
          .join(" ") || email;

      // Prevent duplicate insert
      const { data: existing } = await supabaseAdmin
        .from("preorders")
        .select("id")
        .eq("paystack_reference", d.reference)
        .limit(1);

      if (existing && existing.length > 0) {
        console.log("⚠️ Already processed:", d.reference);
        return NextResponse.json({ received: true });
      }

      // Insert preorder into Supabase
      const row = {
        full_name: fullName,
        email,
        phone: d.customer?.phone || null,
        quantity: Number(d.metadata?.quantity || 1),
        format: d.metadata?.format || "hardcopy", // MUST exist in DB
        amount: d.amount,
        currency: d.currency || "NGN",
        paystack_reference: d.reference,
        paystack_status: d.status,
        meta: { paystack: d }
      };

      const { error: insertError } = await supabaseAdmin
        .from("preorders")
        .insert(row);

      if (insertError) {
        console.error("❌ Supabase insert error:", insertError);
      }

      if (email) {
        await sendResendMail(
          email,
          "Your Book Preorder — Payment Successful",
          paymentSuccessTemplate({
            name: fullName,
            reference: d.reference,
            quantity: Number(d.metadata?.quantity || 1),
            format: row.format,
            baseUrl: BASE_URL,
          })
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("❌ WEBHOOK ERROR:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
