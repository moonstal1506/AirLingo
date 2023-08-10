import instance from "./instance";
import processApiResponse from "@/utils/api";

const getScriptList = async ({ responseFunc, data }) => {
    const { userId, date } = data;
    try {
        const response = await instance.get(`/api/study/user/${userId}/date`, {
            params: { date },
        });
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        return e.response;
    }
};

const postScriptList = async ({ responseFunc, data }) => {
    const { userId, date } = data;
    try {
        const response = await instance.get(`/api/study/user/${userId}/date`, {
            params: { date },
        });
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        return e.response;
    }
};

const postCreateScript = async ({ responseFunc, data }) => {
    const { sessionId, cardId, studyId } = data;
    console.log("스크립트 생성 api 안쪽임");
    try {
        const response = await instance.post(
            `/api/script?sessionId=${sessionId}&cardId=${cardId}&studyId=${studyId}`,
        );
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        return e.response;
    }
};

export { getScriptList, postScriptList, postCreateScript };
