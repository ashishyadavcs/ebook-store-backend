export const detectTokenReuse = (req, res, next) => {
    const refreshtoken = req.cookies["refreshtoken"];
    if (!refreshtoken) return next();

    // Check if the refresh token is being reused
    const isReuseDetected = checkForTokenReuse(refreshtoken);
    if (isReuseDetected) {
        res.clearCookie("accesstoken");
        res.clearCookie("refreshtoken");
        return next(new createHttpError(401, "Token reuse detected. Please login again."));
    }
    next();
};
