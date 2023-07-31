import instance from "./instance";
import processApiResponse from "@/utils/api";

const getUserProfile = async ({ responseFunc, data }) => {
    const { userLoginId } = data;
    try {
        const response = await instance.get(`/user/${userLoginId}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

export default getUserProfile;
