import { Router } from "express";
import { EmailController } from "../controllers/email.js";
const router = Router();
const emailController = new EmailController();
router.post("/send-email", (req, res, next) => {
    emailController.sendEmail(req, res, next);
});

router.post("/send-otp", (req, res, next) => {
    emailController.sendOTPEmail(req, res, next);
});

router.post("/verify-otp", (req, res, next) => {
    emailController.verifyOTP(req, res, next);
});

export default router;
