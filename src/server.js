import app from "./config/app.js";
import { connectDB } from "./config/database.js";
import config from "./config/index.js";

const createServer = async () => {
    try {
        await connectDB();
        app.get("/", (req, res) => {
            res.json({
                msg: "ebook store api",
            });
        });
        app.listen(config.PORT);
    } catch (err) {
        process.exit(1);
    }
};
createServer();
