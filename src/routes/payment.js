import { Router } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import config from "../config/index.js";
import Payment from "../models/payment.js";
const router = Router();

router.post("/create-order", async (req, res, next) => {
    const razorpay = new Razorpay({
        key_id: config.RAZORPAY_KEYID,
        key_secret: config.RAZORPAY_KEYSECRET,
    });
    try {
        const { amount, currency = "INR", ebookid } = req.body;
        const options = {
            amount: amount,
            currency,
            payment_capture: 1,
        };
        const order = await razorpay.orders.create(options);
        return res.status(200).json({
            success: true,
            data: order,
        });
    } catch (err) {
        next(err);
    }
});

router.post("/verify-payment", async (req, res, next) => {
    try {
        const { orderid, paymentid, signature } = req.body;
        const body = orderid + "|" + paymentid;

        const expectedSignature = crypto
            .createHmac("sha256", config.RAZORPAY_KEYSECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === signature) {
            const payment = new Payment({
                orderId: orderid,
                paymentId: paymentid,
                status: "succeeded",
                ebook: "",
                amount: "",
                currency: "",
                user: "",
            });
            await payment.save();
            return res.status(200).json({
                success: true,
                message: "payment verified",
            });
        }
        return res.status(200).json({
            success: false,
            message: "invalid signature",
        });
    } catch (err) {
        next(err);
    }
});

export default router;
