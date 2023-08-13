import instance from "./instance";
import processApiResponse from "@/utils/api";

const { VITE_MATCHING_SERVER_URL } = import.meta.env;

const getConcurrentUser = async ({ responseFunc, routeTo }) => {
    try {
        const response = await instance.get(`/api/matching/concurrent-users`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

const postMatching = async ({ responseFunc, data, routeTo }) => {
    try {
        const response = await instance.post(`/api/matching`, data);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

const postOpenviduToken = async ({ responseFunc, data, routeTo }) => {
    if (!("sessionId" in data)) return {};
    try {
        const response = await instance.post(`/api/matching/${data.sessionId}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

const getPremiumMatching = async ({ responseFunc, data, routeTo }) => {
    const { userId } = data;
    try {
        const response = await instance.get(`/api/matching/premium/${userId}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

const cancelMatching = async ({ responseFunc, data, routeTo }) => {
    const { userId } = data;
    try {
        const response = await instance.get(`/matching/cancel/${userId}`, {
            baseURL: VITE_MATCHING_SERVER_URL,
        });
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

export { getConcurrentUser, postMatching, postOpenviduToken, getPremiumMatching, cancelMatching };
