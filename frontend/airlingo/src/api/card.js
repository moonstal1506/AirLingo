import instance from "./instance";
import processApiResponse from "@/utils/api";

const getCardCode = async ({ responseFunc }) => {
    try {
        const response = await instance.get(`/api/cardCode`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const getCard = async ({ responseFunc, data }) => {
    const { cardCode, languageCode } = data;
    try {
        const response = await instance.get(
            `/api/card?cardCode=${cardCode}&languageCode=${languageCode}`,
        );
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        return e.response;
    }
};

export { getCardCode, getCard };
