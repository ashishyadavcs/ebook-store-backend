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
                ? `${baseUrl}/payment/verify?session_id={CHECKOUT_SESSION_ID}`
                : `https://${baseUrl}/payment/verify?session_id={CHECKOUT_SESSION_ID}`;

            const session = await stripe.checkout.sessions.create({
                ui_mode: "embedded",
                payment_method_types: ["card"], // Support credit/debit cards and UPI
                mode: "payment",
                currency: currency.toLowerCase(),
                customer_email: req.user.email,
                return_url: returnUrl,
                metadata: {
                    userId: req.user.id,
                    email: req.user.email,
                    ebooks: JSON.stringify(cart.map(item => item.id)),
                    amount: Math.round(cart.reduce((total, item) => total + item.price * 100, 0)),
                },
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
                    quantity: item.quantity,
                })),
            });
            return res.status(200).json({
                success: true,
                clientSecret: session.client_secret,
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async verifyPayment(req, res, next) {
        try {
            const { session_id } = req.query;
            if (false) {
                //for dev mode
                const session = await stripe.checkout.sessions.retrieve(session_id);
                const { ebooks } = session;
                if (!session || session.payment_status !== "paid") {
                    const err = new createHttpError(
                        400,
                        "Payment not completed or session not found"
                    );
                    throw err;
                }
                const isPayment = await Payment.findOne({ paymentId: session?.payment_intent });
                if (isPayment) {
                    return res.status(200).json({
                        success: true,
                        data: isPayment,
                        message: "Payment is verified",
                    });
                }
                const payment = new Payment({
                    user: req.user.id,
                    orderId: session?.id,
                    paymentId: session?.payment_intent,
                    status: "paid",
                    paymentGateway: "stripe",
                    paymentMethod: session?.payment_method,
                    ebooks,
                    amount: 3000,
                    currency: "INR",
                });
                const isPaid = await payment.save();
                if (!isPaid) {
                    const err = new createHttpError(404, "order not found");
                    throw err;
                }
                return res.status(200).json({
                    success: true,
                    data: isPaid,
                    message: "Payment is verified",
                });
            } else {
                const isPaid = await Payment.findOne({ paymentId: session?.payment_intent });
                if (isPaid) {
                    return res.status(200).json({
                        success: false,
                        message: "Payment not found",
                    });
                }
                return res.status(404).json({
                    success: true,
                    data: isPaid,
                    message: "Payment is verified",
                });
            }
        } catch (err) {
            console.log(err);
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
            case "payment_intent.succeeded":
            case "checkout.session.completed":
                const payment = event.data.object;
                const { amount, ebooks, userId } = payment.metadata;
                try {
                    const paymentData = new Payment({
                        user: userId,
                        orderId: payment?.id,
                        paymentId: payment?.id, // payment_intent.succeeded event uses payment.id
                        status: "paid",
                        paymentGateway: "stripe",
                        paymentMethod: payment?.payment_method,
                        ebooks: ebooks ? JSON.parse(ebooks) : [],
                        amount: amount ? Number(amount) : 0,
                        currency: payment?.currency ? payment.currency.toUpperCase() : "INR",
                    });
                    await paymentData.save();
                    return res.status(200).json({
                        success: true,
                        message: "payment successful",
                    });
                } catch (err) {
                    next(err);
                }
                break;
        }

        res.status(200).json({ success: true, message: "payment successful" });
    }
}
