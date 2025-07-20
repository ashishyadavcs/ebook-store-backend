const isProd = process.env.NODE_ENV === "production";
const shortLived = {
    httpOnly: true,
    secure: true,
    sameSite: isProd ? "Strict" : "none",
    expires: new Date(Date.now() + 10 * 60 * 1000), // 10 seconds
};
const longLived = {
    httpOnly: true,
    secure: true,
    sameSite: isProd ? "Strict" : "none",
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
};

export const createTokenCookies = (res, tokens, user) => {
    res.cookie("accesstoken", tokens.accesstoken, shortLived);
    res.cookie("_user", user._id.toString(), longLived);
    res.cookie("userrole", user.role, longLived);
    res.cookie("refreshtoken", tokens.refreshtoken, longLived);
};

//for samesite none secure should be true -> to be set in browser otherwise will be blocked
