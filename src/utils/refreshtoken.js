import createHttpError from "http-errors";
import { SessionService } from "../services/session.js";
import { TokenService } from "../services/token.js";
import { createTokenCookies } from "./createcookie.js";
import { session_expiry } from "../config/constants.js";

export const performTokenRefresh = async (req, res, next) => {
    const tokenService = new TokenService();
    const sessionService = new SessionService();
    const refreshtoken = req.cookies["refreshtoken"];
    const isvalid = await tokenService.verifyRefreshToken(refreshtoken);
    if (!isvalid) {
        const error = new createHttpError(401, "invalid refreshtoken");
        throw error;
    }
    const { sessionId, deviceId } = isvalid;
    const isSessionValid = await sessionService.findSessionById(sessionId);
    if (!isSessionValid) {
        const error = new createHttpError(401, "session not found");
        throw error;
    }
    let session;
    if (isSessionValid.deviceId !== req.cookies["deviceId"]) {
        session = await sessionService.createSession({
            userId: isvalid.id,
            role: isvalid.role,
            ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
            deviceId: req.cookies["deviceId"] || "unknown-device",
            userAgent: req.headers["user-agent"],
            expiresAt: session_expiry,
        });
    } else {
        session = await sessionService.updateSession(sessionId, {
            userId: isvalid.id,
            role: isvalid.role,
            ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
            deviceId: req.cookies["deviceId"] || "unknown-device",
            userAgent: req.headers["user-agent"],
            expiresAt: session_expiry,
        });
    }

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
};
