import helmet from "helmet";
import rateLimit from "express-rate-limit";
export const securityHeaders = helmet({
    contentSecurityPolicy: false,
});
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many request from this ip, Please try again later!",
});
