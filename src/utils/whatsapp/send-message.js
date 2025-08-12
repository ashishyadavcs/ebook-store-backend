import config from "../../config/index.js";
export const sendWhatsAppMessage = async data => {
    const { message = "whatsapp testing", to = "917068513356" } = data || {
        type: "template",
        template: {
            name: "hello_world",
            language: { code: "en_US" },
        },
    };
    const token = config.WHATSAPP_TOKEN;
    const phoneNumberId = config.WHATSAPP_PHONE_NUMBER_ID;

    try {
        const response = await fetch(`https://graph.facebook.com/v22.0/${phoneNumberId}/messages`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                to,
                ...data,
            }),
        });

        const res = await response.json();
        return res;
    } catch (error) {
        console.error("❌ Error sending WhatsApp message:", error);
    }
};
