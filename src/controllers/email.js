import nodemailer, { createTransport } from "nodemailer";
import config from "../config/index.js";
import templates from "../email-templates/index.js";
import crypto from "crypto";
import OTP from "../models/otp.js";
import User from "../models/user.js";
const { otpTemplate, promotion } = templates;
export class EmailController {
    generateOTP() {
        return crypto.randomInt(1000, 9999).toString(); //4 digit
    }

    createTransporter() {
        return createTransport({
            host: "smtp.gmail.com",
            port: 465,
            service: "gmail",
            secure: true,
            auth: {
                user: config.EMAIL_USER,
                pass: config.EMAIL_PASS,
            },
        });
    }

    async sendOTPEmail(req, res, next) {
        try {
            const { email, name = "User" } = req.body;
            const otp = this.generateOTP();
            await OTP.create({
                email,
                otp,
            });
            const isUser = await User.findOne({ email });
            if (!isUser) {
                const error = new createHttpError(404, "User not found");
                throw error;
            }
            const transporter = this.createTransporter();
            const emailOptions = {
                from: "ebookstore@gmail.com",
                to: email,
                subject: "Ebookstore - Email Verification Code",
                html: otpTemplate(otp, name),
            };
            await transporter.sendMail(emailOptions);
            res.status(200).json({
                success: true,
                message: "OTP sent successfully to your email",
            });
        } catch (err) {
            console.error("OTP Email Error:", err);
            next(err);
        }
    }

    async verifyOTP(req, res, next) {
        try {
            const { email, otp } = req.body;
            const record = await OTP.findOne({ email, otp });
            if (!record)
                return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
            await User.findOneAndUpdate({ email }, { verified: true }, { new: true });
            res.json({ success: true, message: "OTP verified successfully" });
        } catch (err) {
            next(err);
        }
    }

    async sendEmail(req, res, next) {
        try {
            const { from = "ebookstore@gmail.com", to, subject, body: text, type } = req.body;
            const transporter = this.createTransporter();
            const emailOption = {
                from,
                to,
                subject: `ebookstore - ${subject}`,
                ...(type == "contact" ? { text } : { html: promotion() }),
            };
            await transporter.sendMail(emailOption);
            res.status(200).json({
                success: true,
                message: "email sent successfully",
            });
        } catch (err) {
            next(err);
        }
    }
}
