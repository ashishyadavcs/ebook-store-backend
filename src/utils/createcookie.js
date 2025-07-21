import {
    accesstoken_expiry,
    deviceid_cookie_expiry,
    refreshtoken_expiry,
} from "../config/constants.js";

const isProd = process.env.NODE_ENV === "production";
const shortLived = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "Strict" : "lax",
    maxAge: accesstoken_expiry,
};
const longLived = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "Strict" : "lax",
    maxAge: refreshtoken_expiry,
};

export const createTokenCookies = (res, tokens, user, deviceIdLogin) => {
    res.cookie("accesstoken", tokens.accesstoken, shortLived);
    res.cookie("_user", user._id.toString(), longLived);
    res.cookie("userrole", user.role, longLived);
    res.cookie("refreshtoken", tokens.refreshtoken, longLived);
    if (deviceIdLogin) {
        res.cookie("deviceId", deviceIdLogin, {
            httpOnly: true,
            secure: isProd,
            sameSite: "Strict",
            maxAge: deviceid_cookie_expiry,
        });
    }
};

//for samesite none secure should be true -> to be set in browser otherwise will be blocked
