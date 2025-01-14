import createHttpError from "http-errors";
import Ebook from "../models/ebook.js";
import { DBFilter } from "../utils/dbFilter.js";

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
                return await Ebook.findById(id);
            }
            //pagination start
            const { page, limit } = query;

            if (page && limit) {
                const skip = (page - 1) * limit;
                const filter = DBFilter(query);
                const totalEbooks = await Ebook.countDocuments(filter);
                const ebooks = await Ebook.find()
                    .skip(skip)
                    .limit(Number(limit))
                    .sort({ createdAt: -1 });
                return {
                    ebooks,
                    pagination: {
                        totalpage: Math.ceil(totalEbooks / limit),
                        currentpage: page,
                    },
                };
            }
            //pagination end
            return await Ebook.find(query);
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
