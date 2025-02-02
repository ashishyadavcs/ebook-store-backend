import mongoose from "mongoose";
import { EbookService } from "../services/ebook.js";
import { Userservice } from "../services/user.js";

const userService = new Userservice();
const ebookService = new EbookService();
export class UserController {
    async getUserWithEbooks(req, res, next) {
        try {
            const id = req.user.id;
            const user = await userService.findById(id);
            const ebooks = await ebookService.getEbooks(null, { uploadedBy: id });
            return res.status(200).json({
                success: true,
                data: {
                    user,
                    ebooks,
                },
            });
        } catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try {
            console.log(req);
            const id = req.user.id;
            const data = { ...req.body };
            if (req.files) {
                const image = req.files.find(p => (p.fieldname = "image")).path;
                data.image = image;
            }
            const user = await userService.update(id, data);
            console.log({ user });
            return res.status(200).json({
                success: true,
                message: "profile updated",
            });
        } catch (err) {
            next(err);
        }
    }
}
