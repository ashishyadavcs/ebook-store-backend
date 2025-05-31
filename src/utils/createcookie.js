const isProd = process.env.NODE_ENV === "production";
const shortLived = {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict",
    expires: new Date(Date.now() + 10 * 1000),
};
const longLived = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
};

export const createTokenCookies = (req, res, next, tokens, user) => {
    res.cookie("accesstoken", tokens.accesstoken, shortLived);
    res.cookie("_user", user._id.toString(), shortLived);
    res.cookie("userrole", user.role, shortLived);
    res.cookie("refreshtoken", tokens.refreshtoken, longLived);
};
