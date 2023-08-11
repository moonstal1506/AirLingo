import axios from "axios";
import instance from "./instance";
import processApiResponse from "@/utils/api";

const { VITE_MATCHING_SERVER_URL } = import.meta.env;

const instanceMatching = axios.create({
    baseURL: VITE_MATCHING_SERVER_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": `http://localhost:5173`,
        "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true,
});

const getConcurrentUser = async ({ responseFunc }) => {
    try {
        const response = await instance.get(`/api/matching/concurrent-users`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const postMatching = async ({ responseFunc, data }) => {
    try {
        const response = await instance.post(`/api/matching`, data);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const postOpenviduToken = async ({ responseFunc, data }) => {
    if (!("sessionId" in data)) return {};
    try {
        const response = await instance.post(`/api/matching/${data.sessionId}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        return e.response;
    }
};

const getPremiumMatching = async ({ responseFunc, data }) => {
    const { userId } = data;
    try {
        const response = await instance.get(`/api/matching/premium/${userId}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        return e.response;
    }
};

const cancelMatching = async ({ responseFunc, data }) => {
    const { userId } = data;
    try {
        const response = await instanceMatching.get(`/matching/cancel/${userId}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        return e.response;
    }
};

export { getConcurrentUser, postMatching, postOpenviduToken, getPremiumMatching, cancelMatching };
