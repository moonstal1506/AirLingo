// import instance from "./instance";
import axios from "axios";
import processApiResponse from "@/utils/api";

// ----------------------------------------------------------------------------------------------------

const getSearchResult = async ({ responseFunc, data, routeTo }) => {
    try {
        const { from, dest, phrase } = data;
        const queryParams = {
            from,
            dest,
            format: "json",
            pretty: true,
            phrase,
        };
        const customAxios = axios.create({
            baseURL: "https://glosbe.com",
            timeout: 10000,
            withCredentials: true,
        });
        const response = await customAxios.get("/gapi/translate", { params: queryParams });
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

export default getSearchResult;
