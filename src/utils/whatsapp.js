import createHttpError from "http-errors";
import config from "../config/index.js";

export const sendWhatsappMessage = async (number, message) => {
    try {
        const body = {
            messaging_product: "whatsapp",
            to: number,
            type: "text",
            text: {
                body: message,
            },
        };

        const response = await fetch(config.WHATSAPP_ENDPOINT, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${config.WHATSAPP_BUSSINESS_APIKEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const result = await response.json();
        console.log({ result, number });
        return result;
    } catch (err) {
        const error = new createHttpError(err.statuscode, err.message);
        throw error;
    }
};
