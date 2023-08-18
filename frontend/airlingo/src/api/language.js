import instance from "./instance";
import processApiResponse from "@/utils/api";

// ----------------------------------------------------------------------------------------------------

const getLanguage = async ({ responseFunc, routeTo }) => {
    try {
        const response = await instance.get(`/api/language`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

const getGrade = async ({ responseFunc, routeTo }) => {
    try {
        const response = await instance.get(`/api/grade`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

export { getLanguage, getGrade };
