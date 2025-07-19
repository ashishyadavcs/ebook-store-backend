import createHttpError from "http-errors";
import { TokenService } from "../services/token.js";
const tokenService = new TokenService();
export const authenticate = async (req, res, next) => {
    try {
        const authheader = req.headers.authorization;
        const token = authheader?.split(" ")[1] || req.cookies["accesstoken"];
        if (!token) {
            const error = new createHttpError(401, "unauthorized");
            throw error;
        }
        const isVerified = await tokenService.verifyAccessToken(token);
        if (!isVerified) {
            const error = new createHttpError(401, "invalid accesstoken header");
            throw error;
        }
        console.log("user authenticated", isVerified);
        req.user = isVerified;
        next();
    } catch (err) {
        next(err);
    }
};
