import mongoose, { Types } from "mongoose";
const paymentSchema = mongoose.Schema({
    user: {
        type: Types.ObjectId,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    ebooks: [{ type: Types.ObjectId, ref: "Ebook" }],
    paymentId: {
        type: String,
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
    paymentMethod: { type: String },
    paymentGateway: { type: String, default: "razorpay" },
    status: {
        type: String,
        required: true,
        enum: ["paid", "pending", "failed"],
        default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
});

const Payment = new mongoose.model("Payment", paymentSchema);
export default Payment;
