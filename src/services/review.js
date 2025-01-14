import Review from "../models/review.js";

export class ReviewService {
    async getReviews(ebook) {
        try {
            return await Review.find({ ebook });
        } catch (err) {
            throw err;
        }
    }
    async addReview(data) {
        try {
            const review = new Review(data);
            return await review.save();
        } catch (error) {
            throw error;
        }
    }
    async deleteReview(id) {
        try {
            return await Review.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}
