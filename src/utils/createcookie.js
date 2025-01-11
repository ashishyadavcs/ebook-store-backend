export const createTokenCookies = async (req, res, next, tokens) => {
    res.cookie("accesstoken", tokens.accesstoken, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000), //60 seconds
    });
    res.cookie("refreshtoken", tokens.refreshtoken, {
        httpOnly: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //  1 month
    });
};
