export const promotion = (
    title = "Welcome to Ebookstore",
    message = "We’re excited to have you on board. Click below to start exploring.",
    button = {}
) => {
    const { url = "https://ebook-store-navy.vercel.app/", text = "visit now" } = button;
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
  </head>
  <body
    style="
      font-family: sans-serif;
      font-size: 18px;
      text-align: center;
      background: #ffffff;
      border-radius: 10px;
      padding: 20px;
      margin: 0;
    "
  >
    <!-- ✅ IMAGE SECTION -->
    <div style="margin-bottom: 20px;">
      <img
        src="https://ebook-store-navy.vercel.app/images/logo.svg"
        alt="Ebookstore Logo"
        width="80"
        height="80"
        style="display: block; margin: 0 auto;"
      />
    </div>

    <!-- ✅ TITLE -->
    <h1 style="color: #000000; margin-bottom: 10px;">
      Welcome to Ebookstore
    </h1>

    <!-- ✅ MESSAGE -->
    <p style="margin: 10px 0 30px;">
      We’re excited to have you on board. Click below to start exploring.
    </p>

    <!-- ✅ CTA BUTTON -->
    <a
      href="https://ebook-store-navy.vercel.app/"
      style="
        padding: 12px 24px;
        background-color: #ff0080;
        color: #ffffff;
        text-decoration: none;
        border-radius: 8px;
        display: inline-block;
        font-weight: bold;
      "
    >
      Visit Now
    </a>

    <!-- ✅ FOOTER -->
    <footer
      style="
        margin-top: 40px;
        font-size: 12px;
        color: #888888;
      "
    >
      &copy; ${new Date().getFullYear()} Ebookstore. All rights reserved.
    </footer>
  </body>
</html>


`;
};
