import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";
const swaggerPath = path.resolve("./src/swagger/swagger-output.json");
import { generateDocs } from "./config.js";

export const setupSwagger = app => {
    generateDocs();
    if (fs.existsSync(swaggerPath)) {
        const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf-8"));
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    } else {
        console.warn("⚠️ Swagger file not found. Run `node swagger.js` first.");
    }
};
