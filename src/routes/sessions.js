import express from "express";
import { SessionController } from "../controllers/session.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();
const sessionController = new SessionController();

router.get("/devices", authenticate, (req, res, next) => {
    sessionController.getDevices(req, res, next);
});
router.delete("/devices/:deviceId", authenticate, (req, res, next) => {
    sessionController.revokeDevice(req, res, next);
});
router.post("/devices/revoke-all", authenticate, (req, res, next) => {
    sessionController.revokeAllDevices(req, res, next);
});

export default router;
