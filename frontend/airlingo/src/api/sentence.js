import processApiResponse from "@/utils/api";
import instance from "./instance";

const getSentence = async ({ responseFunc, routeTo }) => {
    try {
        const response = await instance.post(`/api/sentence`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

export default getSentence;
