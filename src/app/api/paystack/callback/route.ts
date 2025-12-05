// src/app/api/paystack/callback/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendBrevoMail } from "@/lib/email"; // <- note path
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");
    // If Paystack sent a status param (some flows): use it
    const statusParam = searchParams.get("status");

    if (!reference) {
      // nothing to verify, redirect to failure
      return NextResponse.redirect("/book/failure");
    }

    // Verify with Paystack
    const res = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    // If paystack returned success
    const payStatus = json?.data?.status;

    if (payStatus === "success") {
      // find order id from metadata (if you passed it) or update by reference
      const orderId = json.data?.metadata?.order_id ?? null;
      const updatePayload: any = {
        paystack_reference: reference,
        paystack_status: "success",
        meta: { ...json.data?.metadata, paystack: json.data },
      };

      if (orderId) {
        await supabaseAdmin.from("preorders").update(updatePayload).eq("id", orderId);
      } else {
        // fallback: try update by reference (insert if not exists)
        const { data: existing } = await supabaseAdmin
          .from("preorders")
          .select("id")
          .eq("paystack_reference", reference)
          .limit(1);

        if (!existing?.length) {
          // insert new record (best effort)
          await supabaseAdmin.from("preorders").insert({
            full_name: json.data?.customer?.email ?? "Customer",
            email: json.data?.customer?.email,
            phone: json.data?.customer?.phone ?? null,
            quantity: Number(json.data?.metadata?.quantity ?? 1),
            amount: json.data?.amount,
            currency: json.data?.currency ?? "NGN",
            paystack_reference: reference,
            paystack_status: "success",
            format: json.data?.metadata?.format ?? "hardcopy",
            meta: { paystack: json.data },
          });
        } else {
          await supabaseAdmin.from("preorders").update(updatePayload).eq("paystack_reference", reference);
        }
      }

      // send email (fire & forget)
      // send email (fire & forget)
      try {
        const to = json.data?.customer?.email;
        const name =
          [json.data?.customer?.first_name, json.data?.customer?.last_name]
            .filter(Boolean)
            .join(" ") || to;

        const amount = json.data?.amount ?? 0;
        const quantity = json.data?.metadata?.quantity ?? 1;

        await sendBrevoMail(
          to, // email address
          "Your Book Preorder — Payment Received", // subject
          `<p>Hi ${name},</p>
     <p>We received your payment. Reference: <strong>${reference}</strong></p>
     <p>Amount: <strong>₦${(amount / 100).toFixed(2)}</strong></p>
     <p>Quantity: ${quantity}</p>
     <p>Thanks!</p>`
        );
      } catch (e) {
        console.error("email send error:", e);
      }


      return NextResponse.redirect("/book/success");
    }

    // default: failure
    return NextResponse.redirect("/book/failure");
  } catch (err) {
    console.error("callback route error:", err);
    return NextResponse.redirect("/book/failure");
  }
}
