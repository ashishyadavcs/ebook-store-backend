//jwt
export const accesstoken_time = 1 * 60 * 1000; // 1 minute
export const refreshtoken_time = 30 * 24 * 60 * 60 * 1000; // 30 days

//cookie
export const accesstoken_expiry = new Date(Date.now() + accesstoken_time);
export const refreshtoken_expiry = new Date(Date.now() + refreshtoken_time);
//session
export const session_expiry = refreshtoken_expiry; // 30 days
