import createHttpError from "http-errors";
import User from "../models/user.js";
import bcript from "bcrypt";
export class Userservice {
    async create(data) {
        try {
            const { email, password } = data;
            const user = await User.findOne({ email });
            if (user) {
                const error = new createHttpError("400", "email already exists");
                throw error;
            }
            const hashedPassword = await bcript.hash(password, 10);
            const newUser = new User({ ...data, password: hashedPassword });
            return await newUser.save();
        } catch (err) {
            const error = new createHttpError(500, err.message);
            throw error;
        }
    }

    async findByEmail(email) {
        return await User.findOne({
            email,
        });
    }
    async findById(id) {
        return await User.findById(id, "-password");
    }
    async getUsers() {
        return await User.find({}, "-password");
    }
    async deleteUser(id) {
        try {
            return await User.findByIdAndDelete(id);
        } catch (err) {
            const error = new createHttpError(500, err.message);
            throw error;
        }
    }
    async update(id, data) {
        return await User.findByIdAndUpdate(id, data, { new: true });
    }
}
