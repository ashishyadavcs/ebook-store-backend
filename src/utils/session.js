import createHttpError from "http-errors";
import { SessionService } from "../services/session.js";
import { TokenService } from "../services/token.js";
import { createTokenCookies } from "./createcookie.js";

export const getClientMeta = req => {
    return {
        userAgent: req.headers["user-agent"],
        ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
        deviceId: req.headers["x-device-id"] || "unknown-device",
    };
};
export const sessionFlow = async (req, res, next, user) => {
    const sessionService = new SessionService();
    const tokenService = new TokenService();
    const meta = getClientMeta(req);
    req.sessionMeta = meta;
    //create session
    const { deviceId, ip, userAgent } = getClientMeta(req);
    const session = await sessionService.createSession({
        userId: user._id,
        role: user.role,
        userAgent: userAgent,
        ip: ip,
        deviceId: deviceId,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });

    if (!session) {
        const error = new createHttpError(500, "failed to create session");
        throw error;
    }
    const tokens = await tokenService.createTokens({
        id: user._id,
        sessionId: session._id,
        role: user.role,
    });
    createTokenCookies(res, tokens, user);
    return {
        tokens,
        sessionId: session._id,
    };
};
