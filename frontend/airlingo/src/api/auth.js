import instance from "./instance";
import processApiResponse from "@/utils/api";

const getLogout = async ({ responseFunc, data, routeTo }) => {
    const { userLoginId } = data;
    try {
        const response = await instance.get(`/api/user/logout/${userLoginId}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

const loginUser = async ({ responseFunc, data, routeTo }) => {
    const loginRequestDto = data;
    try {
        const response = await instance.post(`/api/user/login`, loginRequestDto);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

export { getLogout, loginUser };
