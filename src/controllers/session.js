import RefreshToken from "../models/session.js";
import { TokenService } from "../services/token.js";

const tokenService = new TokenService();

export class UserController {
    async getDevices(req, res) {
        try {
            const userId = req.user.userId;
            const currentDeviceId = tokenService.generateDeviceId(req);

            const devices = await RefreshToken.find({ userId })
                .sort({ createdAt: -1 })
                .select("-token");

            const devicesWithCurrent = devices.map(device => ({
                ...device.toObject(),
                isCurrent: device.deviceId === currentDeviceId,
            }));

            res.json({ devices: devicesWithCurrent });
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch devices" });
        }
    }

    async revokeDevice(req, res) {
        try {
            const { deviceId } = req.params;
            const userId = req.user.userId;

            await RefreshToken.findOneAndDelete({
                _id: deviceId,
                userId: userId,
            });

            res.json({ message: "Device revoked successfully" });
        } catch (error) {
            res.status(500).json({ message: "Failed to revoke device" });
        }
    }

    async revokeAllDevices(req, res) {
        try {
            const userId = req.user.userId;
            const currentDeviceId = tokenService.generateDeviceId(req);

            await RefreshToken.deleteMany({
                userId: userId,
                deviceId: { $ne: currentDeviceId },
            });

            res.json({ message: "All other devices revoked successfully" });
        } catch (error) {
            res.status(500).json({ message: "Failed to revoke devices" });
        }
    }
}
