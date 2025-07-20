import createHttpError from "http-errors";
import { TokenService } from "../services/token.js";
import { createTokenCookies } from "../utils/createcookie.js";
import { SessionService } from "../services/session.js";
const tokenService = new TokenService();
const sessionService = new SessionService();
export const authenticate = async (req, res, next) => {
    try {
        const accesstoken = req.cookies["accesstoken"];
        const refreshtoken = req.cookies["refreshtoken"];
        if (!refreshtoken && !accesstoken) {
            const error = new createHttpError(401, "invalid accesstoken");
            throw error;
        }
        if (refreshtoken && !accesstoken) {
            const isvalid = await tokenService.verifyRefreshToken(refreshtoken);
            if (!isvalid) {
                const error = new createHttpError(401, "invalid refreshtoken");
                throw error;
            }
            const { sessionId } = isvalid;
            const isSessionValid = await sessionService.findSessionById(sessionId);
            if (!isSessionValid) {
                const error = new createHttpError(401, "session not found");
                throw error;
            }
            await sessionService.deleteSession(sessionId); // delete old session
            const session = await sessionService.createSession({
                userId: isvalid.id,
                role: isvalid.role,
                ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
                deviceId: req.headers["x-device-id"] || "unknown-device",
                userAgent: req.headers["user-agent"],
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            });
            const tokens = await tokenService.createTokens({
                id: isvalid.id,
                sessionId: session._id,
                role: isvalid.role,
            });
            req.user = {
                id: isvalid.id,
                role: isvalid.role,
                sessionId: session._id,
            };
            req.refreshed = true;
            res.locals.tokens = tokens;
            createTokenCookies(res, tokens, {
                _id: req.user.id,
                role: req.user.role,
            });
            res.cookie("tokenRefreshed", "true");
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
