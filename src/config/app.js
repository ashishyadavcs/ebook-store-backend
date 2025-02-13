import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./index.js";

import authRouter from "../routes/auth.js";
import ebookRoute from "../routes/ebook.js";
import reviewRoute from "../routes/review.js";
import userRoute from "../routes/user.js";
import paymentRoute from "../routes/payment.js";
import { errorhandler } from "../middleware/errorHandler.js";
import { limiter, securityHeaders } from "./security.js";
import logger from "./logger.js";
const app = express();

//middlewares
app.use(securityHeaders);
app.use(limiter);
// app.use((req, res, next) => { //not working on vercel
//     try {
//         logger.info(req.method, req.url, req.ip);
//         next();
//     } catch (err) {
//         next(err);
//     }
// });
app.use(
    cors({
        origin: config.APP_URL,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
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
//error handler should be last middlware
app.use((err, req, res, next) => {
    errorhandler(err, req, res, next);
});
export default app;
