import { Router } from "express";
import { ReviewController } from "../controllers/review.js";
import {authenticate} from "../middleware/authenticate.js";
const reviewController = new ReviewController();
const router = Router();
router.get("/reviews", (req, res, next) => {
    reviewController.getReview(req, res, next);
});
router.post("/review",authenticate, (req, res, next) => {
    reviewController.addReview(req, res, next);
});
router.delete("/review/:id", (req, res, next) => {
    reviewController.deleteReview(req, res, next);
});
router.get("/reviews", (req, res, next) => {
    reviewController.getReview(req, res, next);
});



export default router;
