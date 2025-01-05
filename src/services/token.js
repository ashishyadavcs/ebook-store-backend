import jwt from "jsonwebtoken";
import config from "../config/index.js";
import RefreshToken from "../models/refreshtoken.js";
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

    async saveRefreshToken(data) {
        const { token, userId, expiresAt } = data;
        const refreshtoken = new RefreshToken({
            token,
            userId,
            expiresAt,
        });
        return await refreshtoken.save();
    }
    async verifyAccessToken(token) {
        return jwt.verify(token, config.TOKEN_SECRET);
    }
    async verifyRefreshToken(token) {
        return jwt.verify(token, config.REFRESS_TOKEN_SECRET);
    }
    async deleteRefreshToken(id) {
        return await RefreshToken.findOneAndDelete({
            userId: id,
        });
    }
}
