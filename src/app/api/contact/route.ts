import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { sendEmail } from "@/lib/resend";
import { contactAdminEmail } from "@/lib/contact-admin-email-template";
import { userConfirmationEmail } from "@/lib/user-confirmation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, bookingType, message } = body;

    // 1️⃣ Validate
    if (!fullName || !email || !bookingType || !message) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }

    // 2️⃣ Save to Supabase
    await supabaseAdmin.from("contacts").insert({
      name: fullName,
      email,
      booking_type: bookingType,
      message
    });

    // 3️⃣ Email Prince
    await sendEmail({
      to: process.env.ADMIN_EMAIL!,
      subject: "New Contact Message — Prince Adeola",
      html: contactAdminEmail({ fullName, email, bookingType, message })
    });

    // 4️⃣ Email User
    await sendEmail({
      to: email,
      subject: "We’ve received your message",
      html: userConfirmationEmail(fullName)
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("CONTACT ERROR:", err);
    return NextResponse.json({ error: "internal" }, { status: 500 });
  }
}
