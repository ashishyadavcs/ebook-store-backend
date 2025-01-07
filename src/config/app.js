import express from "express";
import authRouter from "../routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorhandler } from "../middleware/errorHandler.js";

const app = express();
//middlewares
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(
    express.json({
        limit: "16kb",
    })
);
app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb",
    })
);
app.use((err, req, res, next) => {
    errorhandler(err, req, res, next);
});
//routes
app.use(authRouter);

export default app;
