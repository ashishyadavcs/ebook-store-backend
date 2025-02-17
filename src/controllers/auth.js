import { validationResult } from "express-validator";
import { Userservice } from "../services/user.js";
import createHttpError from "http-errors";
import { CredentialService } from "../services/credential.js";
import { TokenService } from "../services/token.js";
import { createTokenCookies } from "../utils/createcookie.js";
import config from "../config/index.js";
import { verifyClientToken } from "../config/google-login.js";

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
            const data = { ...req.body };
            if (req.files) {
                const image = req.files.find(p => (p.fieldname = "image")).path;
                data.image = image;
            }
            const user = await userService.create(data);
            res.status(200).json({
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
                roles: user.role,
            });

            //save refresh token to verify when refreshing token
            const savedRefreshToken = await tokenService.saveRefreshToken({
                token: tokens.refreshtoken,
                userId: user._id,
                expiresAt: new Date(),
            });
            if (!savedRefreshToken) {
                const error = new createHttpError(500, "failed to save refreshtoken");
                throw error;
            }
            await createTokenCookies(req, res, next, tokens, user);
            const { password: pass, ...userdata } = user._doc; //remove password
            res.status(200).json({
                ...tokens,
                user: userdata,
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }
    async logout(req, res, next) {
        try {
            const token = req.body.token;
            const isverified = await tokenService.verifyRefreshToken(token);
            if (isverified) {
                res.cookie("accesstoken", "", {
                    maxAge: 0, // Expiring the cookie immediately
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "Strict",
                });

                res.cookie("refreshtoken", "", {
                    maxAge: 0,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "Strict",
                });
                res.json({
                    success: true,
                });
            } else {
                const error = new createHttpError(500, "not authenticated");
                throw error;
            }
        } catch (err) {
            next(err);
        }
    }
    async refresh(req, res, next) {
        const { token } = req.body;
        try {
            const isverified = await tokenService.verifyRefreshToken(token);
            if (!isverified) {
                const error = new createHttpError(500, "refresh token expired or invalid");
                throw error;
            }
            const tokens = await tokenService.createTokens({
                id: isverified.id,
                roles: isverified.roles,
            });
            await createTokenCookies(req, res, next, tokens, {
                _id: isverified.id,
                roles: isverified.roles,
            });

            res.json({
                ...tokens,
                success: true,
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    async googleLogin(req, res, next) {
        const createresponse = async user => {
            const { _id } = user;
            const tokens = await tokenService.createTokens({
                id: _id,
            });
            await createTokenCookies(req, res, next, tokens, user);
            return res.json({
                user,
                success: true,
            });
        };

        const payload = await verifyClientToken(req.body.token);
        const { name, email, picture: image } = payload;
        const user = await userService.findByEmail(email);
        if (!user) {
            const newuser = await userService.create({
                email,
                password: "jshdfj_wjkhef_892734_",
                name,
                image,
            });
            await createresponse(newuser);
        }
        await createresponse(user);
    }
}
export default AuthController;
