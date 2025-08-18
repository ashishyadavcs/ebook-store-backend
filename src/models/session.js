import { Schema } from "mongoose";
import mongoose from "mongoose";
const SessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin", "author"],
        default: "user",
    },
    userAgent: {
        type: String,
        required: true, // Ensure userAgent is always provided
    },
    ip: {
        type: String,
        required: true, // Ensure IP address is always provided
    },
    deviceId: {
        type: String,
        required: true, // Ensure deviceId is always provided
    },
    isValid: {
        type: Boolean,
        default: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
SessionSchema.index({ deviceId: 1 }, { unique: true });
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const Session = mongoose.model("Session", SessionSchema);

export default Session;
