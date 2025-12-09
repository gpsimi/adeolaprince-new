// src/lib/resend.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResendMail(to: string, subject: string, htmlContent: string) {
  try {
    const fromAddress = process.env.FROM_NAME 
      ? `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>` 
      : process.env.FROM_EMAIL!;

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to,
      subject,
      html: htmlContent,
    });

    if (error) {
      console.error("RESEND ERROR:", error);
      return { success: false, error };
    }

    console.log("RESEND SENT:", data);
    return { success: true };
  } catch (err) {
    console.error("RESEND EXCEPTION:", err);
    return { success: false, error: err };
  }
}
