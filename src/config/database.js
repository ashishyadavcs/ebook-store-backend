import mongoose from "mongoose";
import config from "./index.js";
export const connectDB = async () => {
    await mongoose
        .connect(config.DB_URL)
        .then(() => {
            console.log("database connected");
        })
        .catch(err => {
            console.log("Could not connect", err);
            process.exit(1);
        });
};
