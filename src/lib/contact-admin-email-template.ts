// src/lib/contact-admin-email-template.ts

interface AdminContactEmailParams {
  fullName: string;
  email: string;
  bookingType: string;
  message: string;
}

export function contactAdminEmail({
  fullName,
  email,
  bookingType,
  message,
}: AdminContactEmailParams) {
  return `
    <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #000; text-align: center; border-bottom: 1px solid #eee; padding-bottom: 20px;">New Contact Message Received!</h2>
      <p>You have received a new message from your website contact form:</p>
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 4px;">
        <h3 style="margin-top: 0; margin-bottom: 15px; color: #333;">Message Details:</h3>
        <ul style="list-style-type: none; padding: 0;">
          <li style="margin-bottom: 10px; font-size: 14px;"><strong>Full Name:</strong> ${fullName}</li>
          <li style="margin-bottom: 10px; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
          <li style="margin-bottom: 10px; font-size: 14px;"><strong>Booking Type:</strong> ${bookingType}</li>
          <li style="margin-bottom: 10px; font-size: 14px;"><strong>Message:</strong><br/> ${message}</li>
        </ul>
      </div>
      <p style="font-size: 0.8em; color: #888; text-align: center; margin-top: 20px;">This is an automated notification from your website.</p>
    </div>
  `;
}
