import { EbookService } from "../services/ebook.js";
import { Userservice } from "../services/user.js";

const userService = new Userservice();
const ebookService = new EbookService();
export class UserController {
    async getUserWithEbooks(req, res, next) {
        try {
            const id = req.user.id;
            const user = await userService.findById(id);
            const ebooks = await ebookService.getEbooks({ user: id });
            return res.status(200).json({
                sucess: true,
                data: {
                    user,
                    ebooks,
                },
            });
        } catch (err) {
            next(err);
        }
    }
}
