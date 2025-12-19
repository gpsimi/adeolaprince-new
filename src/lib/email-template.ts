export function paymentSuccessTemplate({
  name,
  reference,
  quantity,
  format,
  baseUrl,
}: {
  name: string;
  reference: string;
  quantity: number;
  format: string;
  baseUrl: string;
}) {
  const avatarUrl = `${baseUrl}/images/hero-portrait-6.jpeg`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Successful</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
    }
    .wrapper {
      width: 100%;
      background-color: #f4f4f4;
      padding: 20px 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #ddd;
    }
    .header {
      text-align: center;
      padding: 40px 20px;
      background-color: #2c3e50;
      color: #ffffff;
    }
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #fff;
      margin-bottom: 10px;
    }
    .content {
      padding: 30px;
      line-height: 1.6;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #777;
      background-color: #f9f9f9;
    }
    .details {
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 4px;
      margin: 20px 0;
    }
    .details p {
      margin: 10px 0;
      font-size: 14px;
    }
    .capitalize {
      text-transform: capitalize;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <img src="${avatarUrl}" alt="Prince Adeola" class="avatar">
        <h1 style="margin:0; font-size: 24px;">Payment Successful!</h1>
      </div>
      <div class="content">
        <h2 style="font-size: 20px; color: #2c3e50;">Hi ${name},</h2>
        <p>Congratulations on embarking on this Journey. Thank you for purchase!</p>
        <div class="details">
          <p><strong>Reference:</strong> ${reference}</p>
          <p><strong>Quantity:</strong> ${quantity}</p>
          <p><strong>Format:</strong> <span class="capitalize">${format}</span></p>
        </div>
        <p>We are thrilled to have you as part of this journey and will keep you updated on our progress.</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Prince Adeola. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}
