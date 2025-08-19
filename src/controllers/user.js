import Payment from "../models/payment.js";
import { EbookService } from "../services/ebook.js";
import { Userservice } from "../services/user.js";

const userService = new Userservice();
const ebookService = new EbookService();
export class UserController {
    async getUserEbooks(req, res, next) {
        try {
            const id = req.user.id;
            const paidEbooks = await Payment.find({ user: id }).populate("ebooks").exec();
            const ebooks = paidEbooks.flatMap(payment => payment.ebooks);
            return res.status(200).json({
                success: true,
                data: ebooks,
            });
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
    async getUser(req, res, next) {
        try {
            const user = userService.findById(req.user.id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            return res.status(200).json({
                success: true,
                data: user,
            });
        } catch (err) {
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
            if (req.files.length > 0) {
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

    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const user = await userService.deleteUser(id);
            if (!user) {
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
    async sendEmailOtp(req, res, next) {
        try {
            const { email } = req.body;
            const user = await userService.findByEmail(email);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            await userService.sendOtp(email);
            res.status(200).json({
                success: true,
                message: "OTP sent successfully",
            });
        } catch (err) {
            next(err);
        }
    }
    async verifyEmailOtp(req, res, next) {}
}
