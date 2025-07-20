import { validationResult } from "express-validator";
import { Userservice } from "../services/user.js";
import createHttpError from "http-errors";
import { CredentialService } from "../services/credential.js";
import { TokenService } from "../services/token.js";
import { verifyClientToken } from "../config/google-login.js";
import { sessionFlow } from "../utils/session.js";
import { SessionService } from "../services/session.js";

const credentialService = new CredentialService();
const tokenService = new TokenService();
const sessionService = new SessionService();
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
                const error = new createHttpError(500, "no user exist with this email");
                throw error;
            }
            // match password
            const matchPassword = await credentialService.comparePassword(user.password, password);
            if (!matchPassword) {
                const error = new createHttpError(500, "incorrect email or password");
                throw error;
            }
            const { tokens } = await sessionFlow(req, res, next, user);
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
            const token = req.cookies["refreshtoken"];
            const isverified = await tokenService.verifyRefreshToken(token);
            if (!isverified) {
                const error = new createHttpError(500, "not authenticated");
                throw error;
            }

            const { sessionId } = isverified;
            await sessionService.deleteSession(sessionId);

            res.clearCookie("accesstoken");
            res.clearCookie("refreshtoken");
            res.json({
                success: true,
            });
        } catch (err) {
            console.error("Logout error:", err);
            next(err);
        }
    }

    async googleLogin(req, res, next) {
        const createresponse = async user => {
            await sessionFlow(req, res, next, user);
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
