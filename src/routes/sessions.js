import express from "express";
import { UserController } from "../controllers/session.js";
import auth from "../middleware/auth.js";

const router = express.Router();
const userController = new UserController();

router.get("/devices", auth, userController.getDevices);
router.delete("/devices/:deviceId", auth, userController.revokeDevice);
router.post("/devices/revoke-all", auth, userController.revokeAllDevices);

export default router;
