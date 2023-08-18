import instance from "./instance";
import processApiResponse from "@/utils/api";

const getReportItems = async ({ responseFunc, data, routeTo }) => {
    const { languageCode } = data;
    try {
        const response = await instance.get(`/api/reportItems?languageCode=${languageCode}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
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
const postReport = async ({ responseFunc, data, routeTo }) => {
    try {
        const response = await instance.post(`/api/report`, data);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

export { getReportItems, postReport };
