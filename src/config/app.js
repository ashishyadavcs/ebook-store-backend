import express from "express";
import authRouter from "../routes/auth.js";
import ebookRoute from "../routes/ebook.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorhandler } from "../middleware/errorHandler.js";
import config from "./index.js";

const app = express();
//middlewares
app.use(
    cors({
        origin: config.APP_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
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
app.use((err, req, res, next) => {
    errorhandler(err, req, res, next);
});
//routes
app.use(authRouter);
app.use(ebookRoute);

export default app;
