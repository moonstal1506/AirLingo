import instance from "./instance";
import processApiResponse from "@/utils/api";

// 단어장 조회
const getWordList = async ({ responseFunc, data, routeTo }) => {
    const { userId } = data;
    try {
        const response = await instance.get(`/api/word/${userId}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

// 선택 삭제
const deleteWords = async ({ responseFunc, data, routeTo }) => {
    const { userId, selectedIds } = data;

    try {
        const response = await instance.delete(`/api/word/${userId}`, {
            data: selectedIds,
        });
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

// 단어테스트 조회
const getWordTest = async ({ responseFunc, data, routeTo }) => {
    const { userId } = data;
    try {
        const response = await instance.get(`/api/word/test/${userId}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

export { getWordList, deleteWords, getWordTest };
