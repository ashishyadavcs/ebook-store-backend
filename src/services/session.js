import Session from "../models/session.js";
export class SessionService {
    async createSession(data) {
        const session = new Session(data);
        return await session.save();
    }

    async deleteSession(sessionId) {
        return await Session.findByIdAndDelete(sessionId);
    }
    async findSessionById(sessionId) {
        return await Session.findById(sessionId);
    }
}
