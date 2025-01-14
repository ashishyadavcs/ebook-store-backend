import createHttpError from "http-errors";
import { TokenService } from "../services/token.js";
const tokenService = new TokenService();
export const authenticate = async (req, res, next) => {
    try {
        const authheader = req.headers.authorization;
        if(!authheader){
            const error = new createHttpError(401, "auth header not found");
            throw error;
        }
        const token = authheader.split(" ")[1] || req.cookies["accesstoken"];
        const isVerified = await tokenService.verifyAccessToken(token);
        if (!isVerified) {
            const error = new createHttpError(401, "invalid accesstoken header");
            throw error;
        }
        req.user = isVerified;
        next();
    } catch (err) {
        next(err);
    }
};
