import nodemailer from "nodemailer";
import config from "../config/index.js";
import { promotion } from "../email-templates/promotion.js";
export class EmailController {
    async sendEmail(req, res, next) {
        try {
            const { from = "ebookstore@gmail.com", to, subject, body: text, type } = req.body;
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                service: "gmail",
                secure: true,
                auth: {
                    user: config.EMAIL_USER,
                    pass: config.EMAIL_PASS,
                },
            });
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
