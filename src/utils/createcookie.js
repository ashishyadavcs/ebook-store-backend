import config from "../config/index.js";

const domain = config.APP_URL.replace("https://", ".");
export const createTokenCookies = async (req, res, next, tokens) => {
    res.cookie("accesstoken", tokens.accesstoken, {
        httpOnly: true,
        domain: domain,
        secure: true,
        sameSite: "lax",
        expires: new Date(Date.now() + 60 * 60 * 1000), //5 seconds
    });
    res.cookie("refreshtoken", tokens.refreshtoken, {
        httpOnly: true,
        domain: domain,
        secure: true,
        sameSite: "lax",
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //  1 month
    });
};
