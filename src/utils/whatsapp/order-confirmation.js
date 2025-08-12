import config from "../../config/index.js";
import { sendWhatsAppMessage } from "./send-message.js";

export const sendDetailMessage = async (orderid, name = "customer") => {
    const res = await sendWhatsAppMessage({
        type: "template",
        template: {
            name: "details",
            language: { code: "en_US" },
            components: [
                {
                    type: "body",
                    parameters: [
                        { type: "text", text: name },
                        { type: "text", text: orderid },
                    ],
                },
                {
                    type: "button",
                    sub_type: "url",
                    index: "0",
                    parameters: [{ type: "text", text: `/dashboard/orders/${orderid}` }],
                },
            ],
        },
    });
    return res;
};
