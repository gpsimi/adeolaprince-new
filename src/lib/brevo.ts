// lib/brevo.ts
import { TransactionalEmailsApi, TransactionalEmailsApiApiKeys } from "@getbrevo/brevo";

const brevo = new TransactionalEmailsApi();
brevo.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

export async function sendBrevoMail(to: string, subject: string, html: string) {
  try {
    await brevo.sendTransacEmail({
      sender: { email: process.env.FROM_EMAIL!, name: process.env.FROM_NAME || "Book Store" },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    });

    console.log("EMAIL SENT SUCCESSFULLY");
  } catch (error) {
    console.error("BREVO EMAIL ERROR:", error);
  }
}
