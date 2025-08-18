//jwt & cookie maxAge
export const accesstoken_expiry = 1 * 10 * 1000; // 10 sec
export const refreshtoken_expiry = 30 * 24 * 60 * 60 * 1000; // 30 days
//session
export const session_expiry = new Date(Date.now() + refreshtoken_expiry);
//deviceid cookie expiry
export const deviceid_cookie_expiry = 365 * 24 * 60 * 60 * 1000; // 1 year
