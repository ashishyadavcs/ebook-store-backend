import { EbookService } from "../services/ebook.js";
const ebookService = new EbookService();
export class EbookController {
    async saveEbook(req, res, next) {
        try {
            const ebook = await ebookService.create(req.body);
            if (!ebook) {
                const error = new createHttpError(500, "no user found");
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
            const ebooks = await ebookService.getEbooks();
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
}