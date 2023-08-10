import instance from "./instance";
import processApiResponse from "@/utils/api";

const getUserProfile = async ({ responseFunc, data }) => {
    const { userId } = data;
    try {
        const response = await instance.get(`/api/user/${userId}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const postSignUp = async ({ responseFunc, data }) => {
    try {
        console.log(data);
        const response = await instance.post(`/api/user/signup`, data);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const updateUserNickname = async ({ responseFunc, data }) => {
    try {
        console.log(data);
        const response = await instance.patch(`/api/user/nickname`, data);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const updateUserBio = async ({ responseFunc, data }) => {
    try {
        console.log(data);
        const response = await instance.patch(`/api/user/bio`, data);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const updateUserPassword = async ({ responseFunc, data }) => {
    try {
        console.log(data);
        const response = await instance.patch(`/api/user/password`, data);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const updateUserImage = async ({ responseFunc, data }) => {
    const { userId, files } = data;
    try {
        const response = await instance.patch(`/api/user/updateImage`, files, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            params: { userId },
        });
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const deleteUserImage = async ({ responseFunc, data }) => {
    const { userId } = data;
    try {
        const response = await instance.delete(`/api/user/deleteImage`, {
            params: { userId },
        });
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const getDailyGrid = async ({ responseFunc, data }) => {
    const { userId } = data;
    try {
        const response = await instance.get(`/api/user/dailyGrid/${userId}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const deleteUser = async ({ responseFunc, data }) => {
    const { userId } = data;
    try {
        const response = await instance.delete(`/api/user/${userId}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

const updateLanguage = async ({ responseFunc, data }) => {
    console.log(data);
    try {
        const response = await instance.post(`/api/user/language`, data);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

export {
    getUserProfile,
    postSignUp,
    updateUserNickname,
    updateUserBio,
    updateUserImage,
    deleteUserImage,
    getDailyGrid,
    deleteUser,
    updateUserPassword,
    updateLanguage,
};
