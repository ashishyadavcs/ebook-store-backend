import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { accesstoken_expiry, refreshtoken_expiry } from "../config/constants.js";
export class TokenService {
    async createTokens(payload) {
        const accesstoken = jwt.sign(payload, config.TOKEN_SECRET, {
            expiresIn: accesstoken_expiry,
        });
        const refreshtoken = jwt.sign(payload, config.REFRESS_TOKEN_SECRET, {
            expiresIn: refreshtoken_expiry,
        });
        return {
            accesstoken,
            refreshtoken,
        };
    }
    async verifyAccessToken(token) {
        return jwt.verify(token, config.TOKEN_SECRET);
    }
    async verifyRefreshToken(token) {
        return jwt.verify(token, config.REFRESS_TOKEN_SECRET);
    }
}
