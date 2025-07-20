import { accesstoken_expiry, refreshtoken_expiry } from "../config/constants.js";

const isProd = process.env.NODE_ENV === "production";
const shortLived = {
    httpOnly: true,
    secure: true,
    sameSite: isProd ? "Strict" : "none",
    expires: accesstoken_expiry, // 1 minute
};
const longLived = {
    httpOnly: true,
    secure: true,
    sameSite: isProd ? "Strict" : "none",
    expires: refreshtoken_expiry, // 30 days
};

export const createTokenCookies = (res, tokens, user, next) => {
    res.cookie("accesstoken", tokens.accesstoken, shortLived);
    res.cookie("_user", user._id.toString(), longLived);
    res.cookie("userrole", user.role, longLived);
    res.cookie("refreshtoken", tokens.refreshtoken, longLived);
};

//for samesite none secure should be true -> to be set in browser otherwise will be blocked
