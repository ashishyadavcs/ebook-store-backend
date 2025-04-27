import createHttpError from "http-errors";
import Ebook from "../models/ebook.js";
import { DBFilter } from "../utils/dbFilter.js";
import { ebookreviews, ebookReviewsWithUser } from "../utils/aggregation/ebookreviews.js";
import mongoose from "mongoose";

export class EbookService {
    async create(data) {
        try {
            const ebook = new Ebook({
                ...data,
            });
            return await ebook.save();
        } catch (err) {
            const error = new createHttpError(500, "failed to save ebook");
            throw error;
        }
    }
    async getEbooks(id, query) {
        try {
            if (id) {
                return await Ebook.aggregate([
                    ...ebookReviewsWithUser,
                    {
                        $match: { _id: new mongoose.Types.ObjectId(id) }, // ✅ Filter by ID
                    },
                ]);
            }
            //pagination start
            const { page, limit } = query;
            const filter = DBFilter(query);
            if (page && limit) {
                const skip = (page - 1) * limit;
                const totalEbooks = await Ebook.countDocuments(filter);
                const ebooks = await Ebook.aggregate([
                    ...ebookreviews,
                    { $match: filter },
                    { $sort: { createdAt: -1 } },
                    { $skip: skip },
                    { $limit: Number(limit) },
                ]);
                return {
                    ebooks,
                    pagination: {
                        totalpage: Math.ceil(totalEbooks / limit),
                        currentpage: page,
                    },
                };
            }
            //pagination end

            if (Object.keys(query).length > 0) {
                return await Ebook.aggregate([...ebookreviews, { $match: filter }]);
            }

            return await Ebook.aggregate(ebookreviews);
        } catch (err) {
            const error = new createHttpError(500, err.message);
            throw error;
        }
    }
    async updateEbook(id, data) {
        try {
            return await Ebook.findByIdAndUpdate(id, data);
        } catch (err) {
            const error = new createHttpError(500, err.message);
            throw error;
        }
    }
    async deleteEbook(id) {
        try {
            return await Ebook.findByIdAndDelete(id);
        } catch (err) {
            const error = new createHttpError(500, err.message);
            throw error;
        }
    }
}
