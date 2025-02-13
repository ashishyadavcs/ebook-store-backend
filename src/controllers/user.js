import Payment from "../models/payment.js";
import { EbookService } from "../services/ebook.js";
import { Userservice } from "../services/user.js";

const userService = new Userservice();
const ebookService = new EbookService();
export class UserController {
    async getUserWithEbooks(req, res, next) {
        try {
            const id = req.user.id;
            const user = await userService.findById(id);
            const paidEbooks = await Payment.find({ user: id }).populate("ebooks").exec();
            const ebooks = paidEbooks.flatMap(payment => payment.ebooks);
            return res.status(200).json({
                success: true,
                data: {
                    user,
                    ebooks,
                },
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    async getUsers(req, res, next) {
        const users = await userService.getUsers();
        res.status(200).json({
            success: true,
            data: users,
        });
    }

    async update(req, res, next) {
        try {
            const id = req.user.id;
            const data = { ...req.body };
            if (req.files) {
                const image = req.files.find(p => (p.fieldname = "image")).path;
                data.image = image;
            }
            const user = await userService.update(id, data);
            return res.status(200).json({
                success: true,
                user,
            });
        } catch (err) {
            next(err);
        }
    }
}
