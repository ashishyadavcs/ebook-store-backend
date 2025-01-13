import { Router } from "express";
import AuthController from "../controllers/auth.js";
import { registerValidator } from "../validators/register.js";
import { loginValidator } from "../validators/login.js";
import { authenticate } from "../middleware/authenticate.js";
import passport from "../config/passport.js";
import upload from "../middleware/upload.js";

const authController = new AuthController();
const router = Router();

router.post("/register", registerValidator, (req, res, next) => {
    authController.register(req, res, next);
});
router.post("/login", loginValidator, (req, res, next) => {
    authController.login(req, res, next);
});

router.post("/logout", (req, res, next) => {
    authController.logout(req, res, next);
});

router.post("/refreshtoken", (req, res, next) => {
    authController.refresh(req, res, next);
});

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"], session: false })
);
router.get(
    "/auth/callback/google",
    passport.authenticate("google", {
        failureRedirect: "/login",
        scope: ["email", "profile"],
        session: false,
    }),
    (req, res, next) => {
        authController.googleLogin(req, res, next);
    }
);

router.post("/upload", upload.any(), async (req, res, next) => {
    res.json({
        file: req.files,
    });
});

export default router;
