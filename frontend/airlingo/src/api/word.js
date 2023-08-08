import instance from "./instance";
import processApiResponse from "@/utils/api";

const getWordList = async ({ responseFunc, data }) => {
    const { userId } = data;
    try {
        const response = await instance.get(`/api/word/${userId}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        return e.response;
    }
};

export default getWordList;
