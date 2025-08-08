export const contactTemplate = contactData => {
    const {
        name = "User",
        email = "N/A",
        subject = "Contact Form Submission",
        message = "",
        mobile = "N/A",
        submittedAt = new Date().toISOString(),
    } = contactData;

    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Contact Form Submission - Ebookstore</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      font-size: 14px;
      line-height: 1.6;
      background: #f4f4f4;
    "
  >
    <div
      style="
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 10px;
        padding: 40px 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      "
    >
      <!-- Header Section -->
      <div style="text-align: center; margin-bottom: 30px;">
        <img
          src="https://ebook-store-navy.vercel.app/images/logo.png"
          alt="Ebookstore Logo"
          style="max-width: 150px; height: auto; margin-bottom: 20px;"
        />
        <h1 style="color: #333; margin: 0; font-size: 24px;">
          📧 New Contact Form Submission
        </h1>
      </div>

      <!-- Contact Information -->
      <div
        style="
          background: #f8f9fa;
          border-left: 4px solid #007bff;
          padding: 20px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
        "
      >
        <h2 style="color: #333; margin-top: 0; font-size: 18px;">
          Contact Details:
        </h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555; width: 30%;">
              👤 Name:
            </td>
            <td style="padding: 8px 0; color: #333;">
              ${name}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">
              📧 Email:
            </td>
            <td style="padding: 8px 0; color: #333;">
              <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">
                ${email}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">
              📞 Phone:
            </td>
            <td style="padding: 8px 0; color: #333;">
              ${mobile}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">
              📝 Subject:
            </td>
            <td style="padding: 8px 0; color: #333;">
              ${subject}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555;">
              🕒 Submitted:
            </td>
            <td style="padding: 8px 0; color: #333;">
              ${new Date(submittedAt).toLocaleString()}
            </td>
          </tr>
        </table>
      </div>

      <!-- Message Section -->
      <div
        style="
          background: #fff;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        "
      >
        <h3 style="color: #333; margin-top: 0; font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
          💬 Message:
        </h3>
        <div
          style="
            color: #555;
            line-height: 1.8;
            white-space: pre-wrap;
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            border-left: 3px solid #007bff;
          "
        >
          ${message}
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="text-align: center; margin: 30px 0;">
        <a
          href="mailto:${email}?subject=Re: ${subject}"
          style="
            display: inline-block;
            background: #007bff;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 0 10px 10px 0;
          "
        >
          📧 Reply via Email
        </a>
        
        ${
            mobile !== "N/A"
                ? `
        <a
          href="tel:${mobile}"
          style="
            display: inline-block;
            background: #28a745;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 0 10px 10px 0;
          "
        >
          📞 Call
        </a>
        `
                : ""
        }
      </div>

      <!-- Footer -->
      <div
        style="
          border-top: 1px solid #eee;
          padding-top: 20px;
          margin-top: 30px;
          text-align: center;
          color: #999;
          font-size: 14px;
        "
      >
        <p style="margin: 0 0 10px 0;">
          This is an automated notification from your Ebookstore contact form.
        </p>
        <p style="margin: 0;">
          Please respond to the customer as soon as possible to provide excellent service.
        </p>
        
        <div style="margin-top: 15px;">
          <a 
            href="https://ebook-store-navy.vercel.app/admin" 
            style="color: #007bff; text-decoration: none; margin: 0 10px;"
          >
            📊 Admin Dashboard
          </a>
          <span style="color: #ddd;">|</span>
          <a 
            href="https://ebook-store-navy.vercel.app/" 
            style="color: #007bff; text-decoration: none; margin: 0 10px;"
          >
            🌐 Visit Website
          </a>
        </div>
      </div>
    </div>

    <!-- System Info -->
    <div style="max-width: 600px; margin: 20px auto; text-align: center;">
      <p style="color: #999; font-size: 12px; line-height: 1.4;">
        🔒 This email was automatically generated by the Ebookstore contact form system.
        <br />
        For technical support, please contact your system administrator.
      </p>
    </div>
  </body>
</html>
`;
};

// Auto-reply template for customers
export const contactAutoReplyTemplate = customerData => {
    const { name = "Customer", email = "" } = customerData;

    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thank you for contacting Ebookstore</title>
  </head>
  <body
    style="
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      background: #f4f4f4;
      margin: 0;
      padding: 20px;
    "
  >
    <div
      style="
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        border-radius: 10px;
        padding: 40px 30px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      "
    >
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px;">
        <img
          src="https://ebook-store-navy.vercel.app/images/logo.png"
          alt="Ebookstore Logo"
          style="max-width: 150px; height: auto; margin-bottom: 20px;"
        />
        <h1 style="color: #333; margin: 0; font-size: 24px;">
          Thank You for Contacting Us! 📧
        </h1>
      </div>

      <!-- Main Content -->
      <div style="text-align: center; margin: 30px 0;">
        <p style="color: #666; font-size: 18px; margin-bottom: 20px;">
          Hello ${name},
        </p>
        
        <p style="color: #666; margin-bottom: 20px;">
          We've received your message and appreciate you taking the time to contact us. 
          Our team will review your inquiry and get back to you as soon as possible.
        </p>

        <div
          style="
            background: #e8f4fd;
            border: 1px solid #b8daff;
            border-radius: 8px;
            padding: 20px;
            margin: 25px 0;
          "
        >
          <p style="margin: 0; color: #0c5460; font-weight: 600;">
            ⏰ Expected Response Time: Within 24 hours
          </p>
        </div>

        <p style="color: #666; margin-bottom: 30px;">
          In the meantime, feel free to explore our collection of amazing ebooks!
        </p>

        <!-- CTA Button -->
        <a
          href="https://ebook-store-navy.vercel.app/"
          style="
            display: inline-block;
            background: #007bff;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
          "
        >
          📚 Browse Ebooks
        </a>
      </div>

      <!-- Support Info -->
      <div
        style="
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          margin: 30px 0;
          text-align: left;
        "
      >
        <h3 style="color: #333; margin-top: 0; font-size: 16px;">
          📞 Need Immediate Assistance?
        </h3>
        <ul style="color: #666; margin: 0; padding-left: 20px;">
          <li>Check our <a href="https://ebook-store-navy.vercel.app/faq" style="color: #007bff;">FAQ section</a></li>
          <li>Browse our <a href="https://ebook-store-navy.vercel.app/help" style="color: #007bff;">Help Center</a></li>
          <li>Follow us on social media for updates</li>
        </ul>
      </div>

      <!-- Footer -->
      <div
        style="
          border-top: 1px solid #eee;
          padding-top: 20px;
          margin-top: 30px;
          text-align: center;
          color: #999;
          font-size: 14px;
        "
      >
        <p style="margin: 0 0 10px 0;">
          Best regards,<br/>
          The Ebookstore Team
        </p>
        
        <div style="margin-top: 15px;">
          <a href="https://ebook-store-navy.vercel.app/" style="color: #007bff; text-decoration: none; margin: 0 10px;">
            🌐 Website
          </a>
          <span style="color: #ddd;">|</span>
          <a href="mailto:support@ebookstore.com" style="color: #007bff; text-decoration: none; margin: 0 10px;">
            📧 Support
          </a>
        </div>
      </div>
    </div>

    <!-- Disclaimer -->
    <div style="max-width: 600px; margin: 20px auto; text-align: center;">
      <p style="color: #999; font-size: 12px; line-height: 1.4;">
        This is an automated response. Please do not reply to this email.
        <br />
        If you need to send additional information, please submit a new contact form.
      </p>
    </div>
  </body>
</html>
`;
};
