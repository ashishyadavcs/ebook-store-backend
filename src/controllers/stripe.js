import stripe from "../config/stripe.js";
import config from "../config/index.js";
import Payment from "../models/payment.js";
import createHttpError from "http-errors";

export class StripeController {
    async createCheckoutSession(req, res, next) {
        try {
            const { currency = "usd", successUrl, cart } = req.body;
            // Construct proper return URL with scheme
            const baseUrl =
                successUrl || req.headers.origin || config.APP_URL || "http://localhost:3000";
            const returnUrl = baseUrl.startsWith("http")
                ? `${baseUrl}/payment/return?session_id={CHECKOUT_SESSION_ID}`
                : `https://${baseUrl}/payment/return?session_id={CHECKOUT_SESSION_ID}`;

            const session = await stripe.checkout.sessions.create({
                ui_mode: "embedded",
                payment_method_types: ["card"], // Support credit/debit cards and UPI
                mode: "payment",
                currency: currency.toLowerCase(),
                customer_email: req.user.email,
                return_url: returnUrl,
                line_items: cart.map(item => ({
                    price_data: {
                        currency: currency.toLowerCase(), // Ensure currency is lowercase
                        product_data: {
                            name: item.title,
                            description: item.description || "Digital content",
                            images: item.coverImageUrl ? [item.coverImageUrl] : [], // Add product image if available
                        },
                        unit_amount: Math.round(item.price * 100), // Ensure amount is integer
                    },
                    quantity: 1,
                })),
            });
            return res.status(200).json({
                success: true,
                clientSecret: session.client_secret,
            });
        } catch (err) {
            next(err);
        }
    }

    async verifyPayment(req, res, next) {
        try {
            const { session_id } = req.query;
            const isPaid = await Payment.findOne({ orderId: session_id });
            if (!isPaid) {
                const err = new createHttpError(404, "order not found");
                throw err;
            }
            return res.status(200).json({
                success: true,
                data: isPaid,
                message: "Payment is verified",
            });
        } catch (err) {
            next(err);
        }
    }

    async webhook(req, res, next) {
        const sig = req.headers["stripe-signature"];
        let event;

        try {
            event = stripe.webhooks.constructEvent(
                req.rawBody || req.body, // Use rawBody if available (for express.raw middleware)
                sig,
                config.STRIPE_WEBHOOK_SECRET_KEY
            );
        } catch (err) {
            next(err);
        }

        switch (event.type) {
            case "checkout.session.completed":
                const checkoutSessionCompleted = event.data.object;
                try {
                    const payment = new Payment({
                        user: req.user.id,
                        orderId: checkoutSessionCompleted?.id,
                        paymentId: checkoutSessionCompleted?.payment_intent,
                        status: "paid",
                        paymentGateway: "stripe",
                        paymentMethod: checkoutSessionCompleted?.payment_method,
                        ebooks: ebooks,
                        amount,
                        currency: "INR",
                    });
                    await payment.save();
                    return res.status(200).json({
                        success: true,
                        message: "payment successful",
                    });
                } catch (err) {
                    next(err);
                }
                break;
        }

        res.status(200).json({ success: true });
    }
}
