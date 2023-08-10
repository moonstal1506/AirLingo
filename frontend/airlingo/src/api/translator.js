// import instance from "./instance";
// import instance from "./instance";
import axios from "axios";
import processApiResponse from "@/utils/api";

// ----------------------------------------------------------------------------------------------------

const getTranslateResult = async ({ responseFunc, data }) => {
    try {
        console.log("번역 수행");
        const { source, target, text } = data;
        const { PAPAGO_CLIENT_ID, PAPAGO_CLIENT_SECRET } = import.meta.env;
        const queryParams = {
            source,
            target,
            text,
        };
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Naver-Client-Id": PAPAGO_CLIENT_ID,
            "X-Naver-Client-Secret": PAPAGO_CLIENT_SECRET,
        };
        const customAxios = axios.create({
            // baseURL: "/api",
            baseURL: "https://openapi.naver.com",
            timeout: 10000,
            withCredentials: true,
        });
        const response = await customAxios.post(
            "/v1/papago/n2mt",
            {},
            {
                params: queryParams,
                headers,
            },
        );
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

// ----------------------------------------------------------------------------------------------------

export default getTranslateResult;
