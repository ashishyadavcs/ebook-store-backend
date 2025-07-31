export const clearAuthCookies = res => {
    res.clearCookie("accesstoken");
    res.clearCookie("refreshtoken");
    res.clearCookie("_user");
    res.clearCookie("userrole");
};
