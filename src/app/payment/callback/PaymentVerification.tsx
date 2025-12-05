//src/app/payment/callback/PaymentVerification.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  reference?: string;
};

export default function PaymentVerification({ reference }: Props) {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");

  useEffect(() => {
    if (!reference) {
      setStatus("failed");
      return;
    }

    async function verifyPayment() {
      // Calls your backend API to verify payment
      const res = await fetch(`/api/paystack/verify?reference=${reference}`);
      const data = await res.json();

      if (data?.status === "success") {
        setStatus("success");
        // Redirect to existing success page after a brief delay
        setTimeout(() => {
          router.push("/book/success");
        }, 1500);
      } else {
        setStatus("failed");
        // Redirect to failure page after a brief delay
        setTimeout(() => {
          router.push("/book/failure");
        }, 1500);
      }
    }

    verifyPayment();
  }, [reference, router]);

  return (
    <div className="max-w-xl mx-auto py-20 text-center">
      {status === "loading" && (
        <p className="text-lg">Verifying your payment…</p>
      )}

      {status === "success" && (
        <div>
          <h1 className="text-2xl font-bold text-green-600">Payment Successful 🎉</h1>
          <p>Your preorder is confirmed! Redirecting...</p>
          <p className="mt-4 text-sm text-muted-foreground">Reference: {reference}</p>
        </div>
      )}

      {status === "failed" && (
        <div>
          <h1 className="text-2xl font-bold text-red-600">Payment Failed ❌</h1>
          <p>We could not verify your payment. Redirecting...</p>
        </div>
      )}
    </div>
  );
}

