// src/app/api/paystack/callback/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendResendMail } from "@/lib/resend";
import { adminNotificationTemplate } from "@/lib/admin-email-template";
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
      // --- Main Logic: Find the original order record and update it ---
      const orderId = json.data?.metadata?.order_id ?? null;
      let orderData = null;

      if (orderId) {
        const { data, error } = await supabaseAdmin
          .from("preorders")
          .update({
            paystack_reference: reference,
            paystack_status: "success",
            meta: { metadata: json.data?.metadata, paystack: json.data },
          })
          .eq("id", orderId)
          .select()
          .single();

        if (error) {
          console.error("Failed to update preorder by ID:", { orderId, error });
        }
        orderData = data;

      } else {
        // --- Fallback Logic for older/unlinked transactions ---
        const { data: existing, error: findError } = await supabaseAdmin
          .from("preorders")
          .update({
            paystack_status: "success",
            meta: { metadata: json.data?.metadata, paystack: json.data },
          })
          .eq("paystack_reference", reference)
          .select()
          .single();
        
        if(findError) {
           console.error("Failed to update preorder by reference:", { reference, findError });
        }
        orderData = existing;
      }

      // --- Send emails (fire & forget) ---
      if (orderData) {
        // 1. Send Customer Confirmation Email
        try {
          const to = orderData.email;
          if (to) {
            await sendResendMail(
              to,
              "Welcome to the Curriculum of Light! 💡🎉",
              paymentSuccessTemplate({
                name: orderData.full_name ?? "Customer",
                reference: reference as string,
                quantity: orderData.quantity ?? 1,
                format: orderData.format ?? "hardcopy",
                baseUrl: BASE_URL || req.nextUrl.origin,
              })
            );
          }
        } catch (e) {
          console.error("Customer email send error:", e);
        }

        // 2. Send Admin Notification Email
        try {
          const adminEmails = ['adeolaprincezz@yahoo.com', 'gpsimi01@gmail.com'];
          
          const adminHtmlContent = adminNotificationTemplate({
            fullName: orderData.full_name,
            email: orderData.email,
            phone: orderData.phone,
            quantity: orderData.quantity,
            format: orderData.format,
            deliveryLocation: orderData.delivery_location,
            reference: reference as string
          });

          await sendResendMail(
            adminEmails,
            `[New Pre-Order] For "${orderData.full_name}"`,
            adminHtmlContent
          );
        } catch (e) {
          console.error("Admin email send error:", e);
        }

      } else {
        console.error("Could not find or update order record after successful payment.", { reference });
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
