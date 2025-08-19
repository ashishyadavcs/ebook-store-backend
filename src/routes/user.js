import { Router } from "express";
import { UserController } from "../controllers/user.js";
import { authenticate } from "../middleware/authenticate.js";
import upload from "../middleware/upload.js";
const router = Router();

const userController = new UserController();

router.get("/user-ebooks", authenticate, (req, res, next) => {
    userController.getUserEbooks(req, res, next);
});
router.get("/user/:id", authenticate, (req, res, next) => {
    userController.getUser(req, res, next);
});
router.get("/users", authenticate, (req, res, next) => {
    userController.getUsers(req, res, next);
});

router.patch("/user", authenticate, upload.any(), (req, res, next) => {
    userController.update(req, res, next);
});
router.delete("/user/:id", authenticate, (req, res, next) => {
    userController.deleteUser(req, res, next);
});

export default router;
