import swaggerAutogen from "swagger-autogen";
import config from "../config/index.js";

const doc = {
    info: {
        title: "Ebook Store API",
        description: "ebook store api documentation",
    },
    host: config.HOST,
    schemes: ["http"],
};

const outputFile = "./src/swagger/swagger-output.json";
const endpointsFiles = ["./src/config/app.js"]; // entry file containing routes

export const generateDocs = () => {
    swaggerAutogen()(outputFile, endpointsFiles, doc);
};
