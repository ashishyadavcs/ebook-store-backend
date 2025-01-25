import mongoose, { Types } from "mongoose";
const paymentSchema = mongoose.Schema({
    user: {
        type: Types.ObjectId,
        required: true,
    },
    ebook: {
        type: Types.ObjectId,
        required: true,
    },
    paymentId: {
        type: Types.ObjectId,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["succeeded", "pending", "failed"],
        default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

paymentSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
