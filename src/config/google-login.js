import { OAuth2Client } from "google-auth-library";
import config from "./index.js";
const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

export const verifyClientToken = async token => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: config.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    return payload;
};
