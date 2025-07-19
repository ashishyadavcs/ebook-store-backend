import Session from "../models/session.js";
export class SessionService {
    async createSession(data) {
        const session = new Session(data);
        return await session.save();
    }

    async deleteSession(sessionId) {
        return await Session.findOneAndDelete({
            _id: sessionId,
        });
    }
    async findSession(sessionId) {
        return await Session.findOne({
            _id: sessionId,
            isValid: true,
        });
    }
}
