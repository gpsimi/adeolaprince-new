// src/app/api/paystack/callback/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendBrevoMail } from "@/lib/email"; // <- note path

interface PaystackMetadata {
  order_id?: string;
  quantity?: number;
  format?: string;
}

interface PaystackCustomer {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

interface PaystackData {
  status: string;
  amount: number;
  currency: string;
  reference: string;
  metadata?: PaystackMetadata;
  customer?: PaystackCustomer;
}

interface PaystackResponse {
  status: boolean;
  message: string;
  data: PaystackData;
}

interface PreorderUpdatePayload {
  paystack_reference: string;
  paystack_status: string;
  meta: {
    metadata?: PaystackMetadata;
    paystack: PaystackData;
  };
}

const PAYSTACK_SECRET: string = process.env.PAYSTACK_SECRET_KEY!;
const SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY: string = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");
    // If Paystack sent a status param (some flows): use it


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

    const json: PaystackResponse = await res.json();

    // If paystack returned success
    const payStatus = json?.data?.status;

    if (payStatus === "success") {
      // find order id from metadata (if you passed it) or update by reference
      const orderId = json.data?.metadata?.order_id ?? null;
      const updatePayload: PreorderUpdatePayload = {
        paystack_reference: reference,
        paystack_status: "success",
        meta: { metadata: json.data?.metadata, paystack: json.data },
      };

      if (orderId) {
        await supabaseAdmin.from("preorders").update(updatePayload).eq("id", orderId);
      } else {
        const { data: existingRecords } = await supabaseAdmin
          .from("preorders")
          .select("id")
          .eq("paystack_reference", reference);

        if (existingRecords && existingRecords.length > 0) {
          // If a record with this reference exists, update it
          await supabaseAdmin.from("preorders").update(updatePayload).eq("paystack_reference", reference);
        } else {
          // No existing record found, insert a new one
          const customerEmail = json.data?.customer?.email;
          const customerFirstName = json.data?.customer?.first_name;
          const customerLastName = json.data?.customer?.last_name;
          const fullName = [customerFirstName, customerLastName].filter(Boolean).join(" ") || customerEmail || "Customer";
          const quantity = Number(json.data?.metadata?.quantity ?? 1);

          await supabaseAdmin.from("preorders").insert({
            full_name: fullName,
            email: customerEmail,
            phone: json.data?.customer?.phone ?? null,
            quantity: quantity,
            amount: json.data?.amount,
            currency: json.data?.currency ?? "NGN",
            paystack_reference: reference,
            paystack_status: "success",
            format: json.data?.metadata?.format ?? "hardcopy",
            meta: { paystack: json.data },
          });
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

        if (to) {
          await sendBrevoMail(
            to, // email address
            "Your Book Preorder — Payment Received", // subject
            `<p>Hi ${name},</p>
       <p>We received your payment. Reference: <strong>${reference}</strong></p>
       <p>Amount: <strong>₦${(amount / 100).toFixed(2)}</strong></p>
       <p>Quantity: ${quantity}</p>
       <p>Thanks!</p>`
          );
        }
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
