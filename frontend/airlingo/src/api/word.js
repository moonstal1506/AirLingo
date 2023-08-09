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

// 선택 삭제
const deleteWords = async ({ responseFunc, data }) => {
    const { userId, selectedIds } = data;

    try {
        const response = await instance.delete(`/api/word/${userId}`, {
            data: selectedIds,
        });
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

export { getWordList, deleteWords };
