import instance from "./instance";
import processApiResponse from "@/utils/api";

const getScriptList = async ({ responseFunc, data, routeTo }) => {
    const { userId, date } = data;
    try {
        const response = await instance.get(`/api/study/user/${userId}/date`, {
            params: { date },
        });
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

const postScriptList = async ({ responseFunc, data, routeTo }) => {
    const { userId, date } = data;
    try {
        const response = await instance.get(`/api/study/user/${userId}/date`, {
            params: { date },
        });
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

const postCreateScript = async ({ responseFunc, data, routeTo }) => {
    const { sessionId, cardId, studyId } = data;
    try {
        const response = await instance.post(
            `/api/script?sessionId=${sessionId}&cardId=${cardId}&studyId=${studyId}`,
        );
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

const putSaveScript = async ({ responseFunc, data, routeTo }) => {
    try {
        const response = await instance.put(`/api/script`, data);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

export { getScriptList, postScriptList, postCreateScript, putSaveScript };
