import instance from "./instance";
import processApiResponse from "@/utils/api";

// ----------------------------------------------------------------------------------------------------

const getTranslateResult = async ({ responseFunc, data, routeTo }) => {
    try {
        const { source, target, text } = data;
        const queryParams = {
            source,
            target,
            text,
        };
        const response = await instance.get("/api/word", {
            params: queryParams,
        });
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

const postWord = async ({ responseFunc, data }) => {
    const { userId } = data;
    try {
        const response = await instance.post(`/api/word/${userId}`, data);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

// ----------------------------------------------------------------------------------------------------

export { getTranslateResult, postWord };
