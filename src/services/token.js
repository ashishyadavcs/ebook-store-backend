import jwt from "jsonwebtoken";
import config from "../config/index.js";
export class TokenService {
    async createTokens(payload) {
        const accesstoken = jwt.sign(payload, config.TOKEN_SECRET, {
            expiresIn: "10day",
        });
        const refreshtoken = jwt.sign(payload, config.REFRESS_TOKEN_SECRET, {
            expiresIn: "30day",
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
