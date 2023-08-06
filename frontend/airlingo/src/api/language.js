import instance from "./instance";
import processApiResponse from "@/utils/api";

// ----------------------------------------------------------------------------------------------------

const getLanguage = async ({ responseFunc }) => {
    try {
        const response = await instance.get(`/api/language`);
        processApiResponse({ responseFunc, response });
        console.log("언어 리스트를 받아왔습니다!", response.data);
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const getGrade = async ({ responseFunc }) => {
    try {
        const response = await instance.get(`/api/grade`);
        processApiResponse({ responseFunc, response });
        console.log("등급 리스트를 받아왔습니다!", response.data);
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

// ----------------------------------------------------------------------------------------------------

export { getLanguage, getGrade };
