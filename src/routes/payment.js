import { Router } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import config from "../config/index.js";
import Payment from "../models/payment.js";
import { authenticate } from "../middleware/authenticate.js";
const router = Router();

router.post("/create-order", authenticate, async (req, res, next) => {
    const razorpay = new Razorpay({
        key_id: config.RAZORPAY_KEYID,
        key_secret: config.RAZORPAY_KEYSECRET,
    });
    try {
        const { amount, currency = "INR" } = req.body;
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
router.get("/payments", authenticate, async (req, res, next) => {
    const { role, id } = req.user;
    try {
        let payments;
        if (role === "admin") {
            payments = await Payment.find();
        } else {
            payments = await Payment.find({ user: id });
        }
        res.status(200).json({
            data: payments,
            success: true,
        });
    } catch (err) {
        next(err);
    }
});
router.get("/payments/:id", authenticate, async (req, res, next) => {
    const { id } = req.params;
    try {
        const payment = await Payment.findById(id);
        res.status(200).json({
            data: payment,
            success: true,
        });
    } catch (err) {
        next(err);
    }
});
router.post("/verify-payment", authenticate, async (req, res, next) => {
    const { orderid, paymentid, signature, ebooks, amount } = req.body;
    const body = orderid + "|" + paymentid;

    const expectedSignature = crypto
        .createHmac("sha256", config.RAZORPAY_KEYSECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === signature) {
        try {
            const payment = new Payment({
                user: req.user.id,
                orderId: orderid,
                paymentId: paymentid,
                status: "succeeded",
                ebooks: ebooks,
                amount,
                currency: "INR",
            });
            await payment.save();

            return res.status(200).json({
                success: true,
                message: "payment verified",
            });
        } catch (err) {
            next(err);
        }
    } else {
        res.json({
            success: false,
            message: "payment failed",
        });
    }
});

export default router;
