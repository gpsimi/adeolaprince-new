export function paymentSuccessTemplate({
  name,
  reference,
  quantity,
  format,
}: {
  name: string;
  reference: string;
  quantity: number;
  format: string;
}) {
  return `
<div style="font-family:sans-serif;">
  <h2 style="color:#4CAF50;">🎉 Payment Successful</h2>
  <p>Hi ${name},</p>
  <p>We received your payment for the preorder.</p>

  <p><b>Reference:</b> ${reference}</p>
  <p><b>Quantity:</b> ${quantity}</p>
  <p><b>Format:</b> ${format}</p>

  <p>Thank you for supporting this project!</p>

  <br/>
  <p>Warm Regards,<br/>Prince Adeola Team</p>
</div>
  `;
}
