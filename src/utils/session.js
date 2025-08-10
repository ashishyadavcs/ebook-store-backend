import createHttpError from "http-errors";
import { SessionService } from "../services/session.js";
import { TokenService } from "../services/token.js";
import { createTokenCookies } from "./createcookie.js";
import { session_expiry } from "../config/constants.js";
import crypto from "crypto";

export const getClientMeta = req => {
    return {
        userAgent: req.headers["user-agent"],
        ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
        deviceId: req.cookies["deviceId"] || "unknown-device",
    };
};
export const generateDeviceId = () => {
    return crypto.randomBytes(16).toString("hex");
};
export const sessionFlow = async (req, res, next, user, deviceIdLogin) => {
    const sessionService = new SessionService();
    const tokenService = new TokenService();
    const meta = getClientMeta(req);

    req.sessionMeta = meta;
    //create session
    const {
        ip,
        userAgent,
        deviceId = deviceIdLogin, //if device id comming at the time of login then use that
    } = getClientMeta(req);
    const existingSession = await sessionService.findSessionByDeviceId(deviceId);
    let session;
    if (existingSession) {
        session = await sessionService.updateSession(existingSession._id, {
            userId: user._id,
            role: user.role,
            userAgent: userAgent,
            ip: ip,
        });
    } else {
        session = await sessionService.createSession({
            userId: user._id,
            role: user.role,
            userAgent: userAgent,
            ip: ip,
            deviceId: deviceId,
            expiresAt: session_expiry,
        });
    }

    if (!session) {
        const error = new createHttpError(500, "failed to create session");
        throw error;
    }
    const tokens = await tokenService.createTokens({
        id: user._id,
        sessionId: session._id,
        role: user.role,
        email: user.email,
    });
    createTokenCookies(res, tokens, user, deviceIdLogin);
    return {
        tokens,
        sessionId: session._id,
    };
};
