import instance from "./instance";
import processApiResponse from "@/utils/api";

const getScriptList = async ({ responseFunc, data }) => {
    const { userId, date } = data;
    try {
        const response = await instance.get(`/api/study/user/${userId}/date`, {
            params: { date }, // params 객체로 전달
        });
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        return e.response;
    }
};

export default getScriptList;
