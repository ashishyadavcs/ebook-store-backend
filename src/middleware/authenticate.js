import { TokenService } from "../services/token.js";
const tokenService = new TokenService();
export const authenticate = async (req, res, next) => {
    try {
        const authheader = req.headers.authorization;
        const token = authheader || req.cookies["accessToken"];
        const isVerified = await tokenService.verifyAccessToken(token);
        if (!isVerified) {
            const error = new createHttpError(500, "invalid accesstoken header");
            throw error;
        }
        req.user = isVerified;
        next();
    } catch (err) {
        next(err);
    }
};
