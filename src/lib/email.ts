//src/lib/email.ts

import Brevo from "@getbrevo/brevo";

const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY!);

export async function sendBrevoMail(to: string, subject: string, htmlContent: string) {
  const email = new Brevo.SendSmtpEmail();

  email.to = [{ email: to }];
  email.sender = {
    email: process.env.FROM_EMAIL!,
    name: process.env.FROM_NAME || "Book Store"
  };
  email.subject = subject;
  email.htmlContent = htmlContent;

  try {
    const res = await apiInstance.sendTransacEmail(email);
    console.log("BREVO SENT:", res);
    return { success: true };
  } catch (err) {
    console.error("BREVO ERROR:", err);
    return { success: false };
  }
}
