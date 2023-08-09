import instance from "./instance";
import processApiResponse from "@/utils/api";

// ----------------------------------------------------------------------------------------------------

const getSearchResult = async ({ responseFunc, data }) => {
    try {
        console.log("검색 수행");
        const DICTIONARY_API = "/gapi/translate";
        const { from, dest, phrase } = data;
        const response = await instance.get(
            `${DICTIONARY_API}?from=${from}&dest=${dest}&format=json&pretty=true&phrase=${phrase}`,
            {
                baseURL: `https://glosbe.com`,
                headers: { "Access-Control-Allow-Origin": `https://glosbe.com` },
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

export default getSearchResult;
