import { Router } from "express";

import authRoutes from "../routes/auth.js";
import ebookRoutes from "../routes/ebook.js";
import userRoutes from "../routes/user.js";
import paymentRoutes from "../routes/payment.js";
import reviewRoutes from "../routes/review.js";
import emailRoutes from "../routes/email.js";
import sessionRoutes from "../routes/sessions.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/ebooks", ebookRoutes);
router.use("/reviews", reviewRoutes);
router.use("/users", userRoutes);
router.use("/payments", paymentRoutes);
router.use("/emails", emailRoutes);
router.use("/sessions", sessionRoutes);

export default router;
