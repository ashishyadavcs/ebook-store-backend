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
    async getEbooks() {
        try {
            return await Ebook.find();
        } catch (err) {
            const error = new createHttpError(500, "failed fetch ebooks");
            throw error;
        }
    }
    async updateEbook(data) {
        try {
            const { id, ...updateFields } = data;
            const ebook = new Ebook({
                ...updateFields,
            });
            return await ebook.findByIdAndUpdate(id, updateFields);
        } catch (err) {
            const error = new createHttpError(500, "failed to update ebook");
            throw error;
        }
    }
}
