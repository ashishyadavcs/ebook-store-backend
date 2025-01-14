import createHttpError from "http-errors";
import User from "../models/user.js";
import bcript from "bcrypt";
export class Userservice {
    async create(data) {
        try {
            const { email, password } = data;
            const user = await User.findOne({ email });
            if (user) {
                const error = new createHttpError("400", "user already exists");
                throw error;
            }
            const hashedPassword = await bcript.hash(password, 10);
            const newUser = new User({ ...data, password: hashedPassword });
            return await newUser.save();
        } catch (err) {
            const error = new createHttpError(500, "failed to create user in db");
            throw error
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
    async update(id,data) {
        return await User.findByIdAndUpdate(id, data);
    }
}
