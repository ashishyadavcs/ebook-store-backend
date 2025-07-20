import Session from "../models/session.js";
export class SessionService {
    async createSession(data) {
        const session = new Session(data);
        return await session.save();
    }

    async deleteSession(sessionId) {
        return await Session.findByIdAndDelete(sessionId);
    }
    async deleteAllSessions(userId, currentDeviceId) {
        return await Session.deleteMany({ userId, deviceId: { $ne: currentDeviceId } });
    }
    async findSessionById(sessionId) {
        return await Session.findById(sessionId);
    }
    async findSessions(userId) {
        return await Session.find({ userId }).sort({ createdAt: -1 });
    }
}
