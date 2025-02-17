export const createTokenCookies = async (req, res, next, tokens, user) => {
    res.cookie("accesstoken", tokens.accesstoken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 10 * 1000), //5 seconds
    });
    res.cookie("refreshtoken", tokens.refreshtoken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //  1 month
    });
    res.cookie("_user", user._id.toString(), {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.cookie("userrole", user.role, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
};
