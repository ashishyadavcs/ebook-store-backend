import { Router } from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import config from "../config/index.js";
const router = Router();

router.post("/create-order", async (req, res, next) => {
  const razorpay = new Razorpay({
    key_id: config.RAZORPAY_KEYID,
    key_secret: config.RAZORPAY_KEYSECRET,
  });
  try {
    console.log("req", req.body);
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
router.post("/verify-payment", async (req, res, next) => {
  try {
    console.log("req", req.body);
    const { orderid, paymentid, signature } = req.body;
    console.log("req-body", req.body);
    const body = orderid + "|" + paymentid;

    const expectedSignature = crypto
      .createHmac("sha256", config.RAZORPAY_KEYSECRET)
      .update(body.toString())
      .digest("hex");
    console.log({ expectedSignature, signature });
    if (expectedSignature === signature) {
      console.log("verfiied");
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
