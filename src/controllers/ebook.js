import createHttpError from "http-errors";
import { EbookService } from "../services/ebook.js";
const ebookService = new EbookService();
export class EbookController {
    async saveEbook(req, res, next) {
        try {
            const data = { ...req.body, uploadedBy: req.user.id };
            if (req.files) {
                const coverImageUrl = req.files.find(p => (p.fieldname = "coverImage")).path; //get image url from cloudainary image object
                data.coverImageUrl = coverImageUrl;
            }
            const ebook = await ebookService.create(data);
            console.log(ebook)
            if (!ebook) {
                const error = new createHttpError(500, "failed to save ebook");
                throw error;
            }
            res.status(200).json({
                data: ebook,
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }
    async getEbooks(req, res, next) {
        try {
            const { id } = req.params;
            const filter = req.query;

            const ebooks = await ebookService.getEbooks(id, filter);
            if (!ebooks) {
                const error = new createHttpError(500, "no ebooks found");
                throw error;
            }
            res.status(200).json({
                data: ebooks,
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }
    async deleteEbook(req, res, next) {
        try {
            const { id } = req.params;
            const ebook = await ebookService.deleteEbook(id);
            if (!ebook) {
                const error = new createHttpError(500, "no ebooks found");
                throw error;
            }
            res.status(200).json({
                message: "deleted successfully",
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }
    async updateEbook(req, res, next) {
        try {
            const { id } = req.params;
            let ebook;
            if (req.files) {
                const coverImageUrl = req.files.find(p => (p.fieldname = "coverImage")).path; //get image url from cloudainary image object
                const data = { ...req.body, coverImageUrl, uploadedBy: req.user.id };
                await ebookService.updateEbook(id, data);
            }
            ebook = await ebookService.updateEbook(id, req.body);
            if (!ebook) {
                const error = new createHttpError(500, "no ebooks found");
                throw error;
            }
            res.status(200).json({
                message: "updated successfully",
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }
}
