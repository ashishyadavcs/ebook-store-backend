import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./index.js";
import { errorhandler } from "../middleware/errorHandler.js";
import { limiter, securityHeaders } from "./security.js";
import { setupSwagger } from "../swagger/index.js";
import routes from "../routes/index.js";
// import logger from "./logger.js";
const app = express();
//swagger
setupSwagger(app);
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
        origin: config.APP_URL,
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
app.use("/api/v1", routes);
//error handler should be last middlware
app.use((err, req, res, next) => {
    errorhandler(err, req, res, next);
});
export default app;
