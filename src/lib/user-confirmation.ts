export function userConfirmationEmail(name: string) {
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px">
    <h2>Thank you for reaching out! 🤍</h2>

    <p>Hi ${name},</p>

    <p>
      We've received your message and truly appreciate you taking the time
      to contact us.
    </p>

    <p>
      Our team will review your message and get back to you as soon as possible.
    </p>

    <br/>

    <p>
      Warm regards,<br/>
      <b>Prince Adeola Team</b>
    </p>
  </div>
  `;
}
