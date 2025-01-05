import { config as _config } from "dotenv";
_config();
const config = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    REFRESS_TOKEN_SECRET: process.env.REFRESS_TOKEN_SECRET,
};
export default config;
