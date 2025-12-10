// src/lib/admin-email-template.ts

interface AdminNotificationParams {
  fullName: string;
  email: string;
  phone: string | null;
  quantity: number;
  format: string;
  deliveryLocation: string | null;
  reference: string;
}

export function adminNotificationTemplate({
  fullName,
  email,
  phone,
  quantity,
  format,
  deliveryLocation,
  reference,
}: AdminNotificationParams) {
  return `
    <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #000; text-align: center; border-bottom: 1px solid #eee; padding-bottom: 20px;">New Book Pre-order Received!</h2>
      <p>A new pre-order has been successfully paid for and confirmed.</p>
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 4px;">
        <h3 style="margin-top: 0; margin-bottom: 15px; color: #333;">Order Details:</h3>
        <ul style="list-style-type: none; padding: 0;">
          <li style="margin-bottom: 10px; font-size: 14px;"><strong>Full Name:</strong> ${fullName}</li>
          <li style="margin-bottom: 10px; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
          <li style="margin-bottom: 10px; font-size: 14px;"><strong>Phone:</strong> ${phone || 'Not provided'}</li>
          <li style="margin-bottom: 10px; font-size: 14px;"><strong>Quantity:</strong> ${quantity}</li>
          <li style="margin-bottom: 10px; font-size: 14px;"><strong>Format:</strong> ${format}</li>
          ${format === 'hardcopy' ? `<li style="margin-bottom: 10px; font-size: 14px;"><strong>Delivery Address:</strong> ${deliveryLocation || 'Not provided'}</li>` : ''}
          <li style="margin-bottom: 10px; font-size: 14px;"><strong>Paystack Ref:</strong> ${reference}</li>
        </ul>
      </div>
      <p style="font-size: 0.8em; color: #888; text-align: center; margin-top: 20px;">This is an automated notification from the website.</p>
    </div>
  `;
}
