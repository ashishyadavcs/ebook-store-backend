import mongoose, { Schema, Types } from "mongoose";
const reviewSchema = Schema({
    user: {
        type: Types.ObjectId,
        required: true,
    },
    ebook: {
        type: Types.ObjectId,
        required: true,
        index: true,
    },
    review: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
reviewSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
