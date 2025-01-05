import { checkSchema } from "express-validator";
export const loginValidator = checkSchema({
    email: {
        notEmpty: true,
        trim: true,
        errorMessage: "email is required",
    },
    password: {
        notEmpty: true,
        errorMessage: "password is required",
    },
});
