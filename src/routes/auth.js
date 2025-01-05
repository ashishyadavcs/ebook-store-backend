import { Router } from "express";
import AuthController from "../controllers/auth.js";
import { registerValidator } from "../validators/register.js";
import { loginValidator } from "../validators/login.js";
import { authenticate } from "../middleware/authenticate.js";

const authController = new AuthController();
const router = Router();

router.post("/register", registerValidator, (req, res, next) => {
    authController.register(req, res, next);
});
router.post("/login", loginValidator, (req, res, next) => {
    authController.login(req, res, next);
});

router.post("/logout", authenticate, (req, res, next) => {
    authController.logout(req, res, next);
});

router.post("/refreshtoken", authenticate, (req, res, next) => {
    authController.refresh(req, res, next);
});

export default router;
