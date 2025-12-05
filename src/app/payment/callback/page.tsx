//src/app/payment/callback/page.tsx

import { redirect } from "next/navigation";
import PaymentVerification from "./PaymentVerification";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | { [key: string]: string | string[] | undefined };
};

export default async function PaymentCallbackPage({ searchParams }: Props) {
  // Handle both Promise and direct searchParams for Next.js compatibility
  const params = searchParams instanceof Promise ? await searchParams : searchParams;
  const status = params.status;

  // If status query param is present, redirect immediately
  if (status === "success") {
    redirect("/book/success");
  }

  if (status === "failed" || status === "cancelled") {
    redirect("/book/failure");
  }

  // Otherwise, show verification UI for reference-based verification
  return <PaymentVerification reference={params.reference as string | undefined} />;
}
