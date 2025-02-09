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

//key migration
// Payment.updateMany(
//     {}, // empty filter to apply to all documents
//     { $rename: { "ebookIds": "ebooks" } } // Rename the field
// ).then((result) => {
//     console.log("Updated documents: ", result);
// }).catch((error) => {
//     console.error("Error updating documents: ", error);
// });
