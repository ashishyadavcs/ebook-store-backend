export const otpTemplate = (otp, name = "User") => {
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification Code</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      font-size: 16px;
      text-align: center;
      background: #f4f4f4;
      margin: 0;
    "
  >
    <div
      style="
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 10px;
        padding: 40px 20px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      "
    >
      <!-- Logo Section -->
      <div style="margin-bottom: 30px;">
        <img
          src="https://ebook-store-navy.vercel.app/images/logo.png"
          alt="Ebookstore Logo"
          style="max-width: 150px; height: auto;"
        />
      </div>

      <!-- Main Content -->
      <h1 style="color: #333; margin-bottom: 20px;">Email Verification</h1>
      
      <p style="color: #666; margin-bottom: 30px; line-height: 1.6;">
        Hello ${name},<br/>
        We received a request to verify your email address. Please use the verification code below:
      </p>

      <!-- OTP Code Box -->
      <div
        style="
          background: #f8f9fa;
          border: 2px dashed #007bff;
          border-radius: 8px;
          padding: 30px;
          margin: 30px 0;
          display: inline-block;
        "
      >
        <p style="margin: 0; color: #666; font-size: 14px; margin-bottom: 10px;">
          Your verification code is:
        </p>
        <h2
          style="
            margin: 0;
            font-size: 36px;
            font-weight: bold;
            color: #007bff;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
          "
        >
          ${otp}
        </h2>
      </div>

      <p style="color: #666; margin-bottom: 20px; line-height: 1.6;">
        This code will expire in <strong>10 minutes</strong> for security reasons.
      </p>

      <p style="color: #666; margin-bottom: 30px; line-height: 1.6;">
        If you didn't request this verification, please ignore this email.
      </p>

      <!-- Footer -->
      <div
        style="
          border-top: 1px solid #eee;
          padding-top: 20px;
          margin-top: 40px;
          color: #999;
          font-size: 14px;
        "
      >
        <p style="margin: 0;">
          Best regards,<br/>
          The Ebookstore Team
        </p>
        <p style="margin: 10px 0 0 0;">
          <a href="https://ebook-store-navy.vercel.app/" style="color: #007bff; text-decoration: none;">
            Visit our website
          </a>
        </p>
      </div>
    </div>

    <!-- Security Notice -->
    <div style="max-width: 600px; margin: 20px auto; text-align: center;">
      <p style="color: #999; font-size: 12px; line-height: 1.4;">
        🔒 This is an automated message. For your security, never share this code with anyone.
      </p>
    </div>
  </body>
</html>
`;
};
