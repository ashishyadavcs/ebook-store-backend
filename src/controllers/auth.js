import { validationResult } from "express-validator";
import { Userservice } from "../services/user.js";
import createHttpError from "http-errors";
import { CredentialService } from "../services/credential.js";
import { TokenService } from "../services/token.js";

const credentialService = new CredentialService();
const tokenService = new TokenService();
const userService = new Userservice();
class AuthController {
    async register(req, res, next) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(500).json({
                success: false,
                errors: result.array(),
            });
        }
        try {
            const user = await userService.create(req.body);
            res.json({
                success: true,
                user,
            });
        } catch (err) {
            next(err);
            return;
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            //validate input
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(400).json({
                    success: false,
                    errors: result.array(),
                });
            }
            //check existing user
            const user = await userService.findByEmail(email);
            if (!user) {
                const error = new createHttpError(500, "no user found");
                throw error;
            }
            // match password
            const matchPassword = await credentialService.comparePassword(user.password, password);
            if (!matchPassword) {
                const error = new createHttpError(500, "password not matched");
                throw error;
            }
            //create token
            const tokens = await tokenService.createTokens({
                id: user._id,
                roles: user.roles,
            });

            //save refresh token to verify when refreshing token
            const saveRefreshToken = await tokenService.saveRefreshToken({
                token: tokens.refreshtoken,
                userId: user._id,
                expiresAt: new Date(),
            });
            if (!saveRefreshToken) {
                const error = new createHttpError(500, "failed to save refreshtoken");
                throw error;
            }

            res.status(200).json({
                ...tokens,
                user,
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }
    async logout(req, res, next) {
        try {
            //id is attched via athenticate middleware
            await tokenService.deleteRefreshToken(req.user.id);
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            res.json({});
        } catch (err) {
            next(err);
        }
    }
    async refresh(req, res, next) {
        const userid = req.user.id;
        const { token } = req.body;
        try {
            const isverified = await tokenService.verifyRefreshToken(token);
            if (!isverified) {
                const error = new createHttpError(500, "refresh token expired or invalid");
                throw error;
            }
            const tokens = await tokenService.createTokens({
                id: userid,
                roles: user.roles,
            });
            res.json({
                ...tokens,
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }
    async googleLogin(req, res, next) {}
}
export default AuthController;