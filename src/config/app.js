import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./index.js";

import authRouter from "../routes/auth.js";
import ebookRoute from "../routes/ebook.js";
import reviewRoute from "../routes/review.js";
import userRoute from "../routes/user.js";
import paymentRoute from "../routes/payment.js";
import emailRoute from "../routes/email.js";
import sessionRoute from "../routes/sessions.js";
import { errorhandler } from "../middleware/errorHandler.js";
import { limiter, securityHeaders } from "./security.js";
// import logger from "./logger.js";
const app = express();

//middlewares
app.set("trust proxy", 1);
app.use(securityHeaders);
app.use(limiter);
// app.use((req, res, next) => {
//     //not working on vercel
//     try {
//         logger.info(req.method, req.url, req.ip);
//         next();
//     } catch (err) {
//         next(err);
//     }
// });
app.use(
    cors({
        origin: [config.APP_URL, "https://ebook-store-fn6w5p4kp-ashish221306s-projects.vercel.app"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());
// Exclude stripe-webhook route from express.json middleware
app.use((req, res, next) => {
    if (req.path === "/stripe-webhook") {
        return next();
    }
    express.json()(req, res, next);
});
app.use(
    express.urlencoded({
        extended: true,
    })
);

//routes
app.use(authRouter);
app.use(ebookRoute);
app.use(reviewRoute);
app.use(userRoute);
app.use(paymentRoute);
app.use(emailRoute);
app.use(sessionRoute);
//error handler should be last middlware
app.use((err, req, res, next) => {
    errorhandler(err, req, res, next);
});
export default app;
