import instance from "./instance";
import processApiResponse from "@/utils/api";

const getCardCode = async ({ responseFunc, routeTo }) => {
    try {
        const response = await instance.get(`/api/cardCode`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

const getCard = async ({ responseFunc, data, routeTo }) => {
    const { cardCode, languageCode } = data;
    try {
        const response = await instance.get(
            `/api/card?cardCode=${cardCode}&languageCode=${languageCode}`,
        );
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

export { getCardCode, getCard };
