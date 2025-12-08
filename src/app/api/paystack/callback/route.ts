// src/app/api/paystack/callback/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendBrevoMail } from "@/lib/email"; // <- note path
import { paymentSuccessTemplate } from "@/lib/email-template";

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
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

export async function GET(req: NextRequest) {
  const failureUrl = BASE_URL ? `${BASE_URL}/book/failure` : new URL("/book/failure", req.url).toString();
  const successUrl = BASE_URL ? `${BASE_URL}/book/success` : new URL("/book/success", req.url).toString();

  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      console.error("No reference found in callback query params");
      return NextResponse.redirect(failureUrl);
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

    console.log("Paystack verification response:", json);

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
      try {
        const to = json.data?.customer?.email;
        const name =
          [json.data?.customer?.first_name, json.data?.customer?.last_name]
            .filter(Boolean)
            .join(" ") || to;

        const quantity = json.data?.metadata?.quantity ?? 1;

        if (to) {
          await sendBrevoMail(
            to,
            "Your Payment Was Successful 🎉",
            paymentSuccessTemplate({
              name: name ?? "Customer",
              reference: reference as string,
              quantity: Number(quantity) || 1,
              format: json.data?.metadata?.format ?? "hardcopy",
            })
          );
        }
      } catch (e) {
        console.error("Email send error:", e);
      }

      return NextResponse.redirect(successUrl);
    }

    // default: failure
    console.error("Paystack transaction was not successful", { status: payStatus, reference });
    return NextResponse.redirect(failureUrl);
  } catch (err) {
    console.error("Callback route error:", err);
    return NextResponse.redirect(failureUrl);
  }
}
