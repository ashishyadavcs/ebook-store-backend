import mongoose from "mongoose";
const userschema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    mobile: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin", "author"],
        default: "user",
    },
    verified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

userschema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const User = new mongoose.model("user", userschema);
export default User;
