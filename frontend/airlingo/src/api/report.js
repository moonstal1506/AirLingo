import instance from "./instance";
import processApiResponse from "@/utils/api";

const getReportItems = async ({ responseFunc, data }) => {
    const { languageCode } = data;
    try {
        const response = await instance.get(`/api/reportItems?languageCode=${languageCode}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

/*
{
  "reportItemId": 1,
  "userId": 1,
  "description": "심한 욕설을 하였습니다."
}
*/
const postReport = async ({ responseFunc, data }) => {
    try {
        const response = await instance.post(`/api/report`, data);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

export { getReportItems, postReport };
