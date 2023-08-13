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

// ----------------------------------------------------------------------------------------------------

export default getTranslateResult;
