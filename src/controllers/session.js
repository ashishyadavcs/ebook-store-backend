import { SessionService } from "../services/session.js";
const sessionService = new SessionService();

export class SessionController {
    async getDevices(req, res, next) {
        try {
            const userId = req.user.id;
            const currentDeviceId = sessionService.findSessions(userId);
            const devices = await sessionService.findSessions(userId);
            const devicesWithCurrent = devices.map(device => ({
                ...device.toObject(),
                isCurrent: device.deviceId === currentDeviceId,
            }));
            res.json({ success: true, devices: devicesWithCurrent });
        } catch (error) {
            next(error);
        }
    }

    async revokeDevice(req, res, next) {
        try {
            const { deviceId } = req.params;
            await sessionService.deleteSession(deviceId);
            res.json({ success: true, message: "Device revoked successfully" });
        } catch (error) {
            next(error);
        }
    }

    async revokeAllDevices(req, res, next) {
        try {
            const userId = req.user.userId;
            const currentDeviceId = req.user.deviceId;
            await sessionService.deleteAllSessions(userId, currentDeviceId);
            res.json({ success: true, message: "All other devices revoked successfully" });
        } catch (error) {
            next(error);
        }
    }
}
