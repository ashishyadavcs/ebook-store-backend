import app from "./config/app.js";
import { connectDB } from "./config/database.js";
import config from "./config/index.js";
import { sendWhatsappMessage } from "./utils/whatsapp.js";

const createServer = async () => {
    try {
        await connectDB();
        app.get("/", async (req, res) => {
            await sendWhatsappMessage("+917068513356", "whatspp test message from eboookstore");
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
