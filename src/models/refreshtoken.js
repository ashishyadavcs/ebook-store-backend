import { Schema } from "mongoose";
import mongoose from "mongoose";
const refreshSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
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
    expiresAt: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
// Automatically delete expired tokens
refreshSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const RefreshToken = mongoose.model("refreshtoken", refreshSchema);

export default RefreshToken;
