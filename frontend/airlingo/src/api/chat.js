import instance from "./instance";
import processApiResponse from "@/utils/api";

const postCreateChatRoom = async ({ responseFunc, data }) => {
    try {
        console.log("채팅방 생성2");
        const response = await instance.post(`/api/chat/room?roomId=${data}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        // fix me! : 불순한 접근, 네트워킹 에러로 판단. e.response의 코드를 가지고 error 페이지로 이동하기!
        return e.response;
    }
};

export default postCreateChatRoom;
