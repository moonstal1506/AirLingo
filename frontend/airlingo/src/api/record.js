import instance from "./instance";
import processApiResponse from "@/utils/api";

/*

{
  "userId": 1,
  "gradeId": 2,
  "languageId": 1,
  "studyId": 1,
  "rating": 4.37
}

*/

const postEvaluate = async ({ responseFunc, data }) => {
    const { userLoginId } = data;
    try {
        const response = await instance.get(`/api/user/logout/${userLoginId}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const getRecordStatistic = async ({ responseFunc, data }) => {
    const { userLoginId } = data;
    try {
        const response = await instance.get(`/api/user/logout/${userLoginId}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

export { postEvaluate, getRecordStatistic };
