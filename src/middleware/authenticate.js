import createHttpError from "http-errors";
import { TokenService } from "../services/token.js";
import { performTokenRefresh } from "../utils/refreshtoken.js";
const tokenService = new TokenService();
export const authenticate = async (req, res, next) => {
    try {
        const accesstoken = req.cookies["accesstoken"];
        const refreshtoken = req.cookies["refreshtoken"];
        if (!refreshtoken && !accesstoken) {
            const error = new createHttpError(401, "invalid accesstoken");
            throw error;
        }
        if (refreshtoken && !accesstoken) {
            await performTokenRefresh(req, res, next);
            next();
        } else {
            const isVerified = await tokenService.verifyAccessToken(accesstoken);
            if (!isVerified) {
                const error = new createHttpError(401, "invalid accesstoken header");
                throw error;
            }
            req.user = isVerified;
            next();
        }
    } catch (err) {
        next(err);
    }
};
