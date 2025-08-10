import { config as _config } from "dotenv";
_config();
const config = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    REFRESS_TOKEN_SECRET: process.env.REFRESS_TOKEN_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    APP_URL: process.env.APP_URL,
    GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_KEY,
    RAZORPAY_KEYID: process.env.RAZORPAY_KEYID,
    RAZORPAY_KEYSECRET: process.env.RAZORPAY_KEYSECRET,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};
export default config;
