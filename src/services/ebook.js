import createHttpError from "http-errors";
import Ebook from "../models/ebook.js";

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
    async getEbooks(id, filter) {
        try {
            if (id) {
                return await Ebook.findById(id);
            }
            return await Ebook.find(filter);
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
