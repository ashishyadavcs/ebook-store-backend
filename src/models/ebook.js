import mongoose from "mongoose";
import {Schema} from "mongoose";
const ebookSchema = Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    language: {
        type: String,
        trim: true,
    },
    fileUrl: {
        type: String,
    },
    coverImageUrl: {
        type: String,
    },
    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            comment: { type: String, trim: true },
            rating: { type: Number, min: 0, max: 5 },
        },
    ],
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
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
ebookSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});
const Ebook = new mongoose.model("Ebook", ebookSchema);
export default Ebook;
