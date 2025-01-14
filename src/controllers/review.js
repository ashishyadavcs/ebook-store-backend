import { ReviewService } from "../services/review.js";
const reviewService = new ReviewService();
export class ReviewController {
    async addReview(req, res, next) {
        try {
            const data = { user: req.user.id, ...req.body };
            const review = await reviewService.addReview(data);
            if (!review) {
                const error = new createHttpError(500, "failed to add review");
                throw error;
            }
            return res.status(200).json({
                success: true,
                data: review,
            });
        } catch (err) {
            next(err);
        }
    }
    async updateReview(req, res, next) {}
    async getReview(req, res, next) {
        try {
            const reviews = await reviewService.getReviews(data);
            if (!reviews) {
                const error = new createHttpError(500, "failed to find reviews");
                throw error;
            }
            return res.status(200).json({
                success: true,
                data: reviews,
            });
        } catch (err) {
            next(err);
        }
    }
    async deleteReview(req, res, next) {
        try {
            const { id } = req.params;
            const reviews = await reviewService.deleteReview(id);
            if (!reviews) {
                const error = new createHttpError(500, "failed to find reviews");
                throw error;
            }
            return res.status(200).json({
                success: true,
                message: "delete successfull",
            });
        } catch (err) {
            next(err);
        }
    }
}
