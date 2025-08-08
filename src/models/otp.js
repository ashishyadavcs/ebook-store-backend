import mongoose from "mongoose";
import { Schema } from "mongoose";
const otpSchema = new Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    purpose: { type: String, required: true, default: "email_verification" },
    createdAt: { type: Date, default: Date.now, expires: "10m" },
});
const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
