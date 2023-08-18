import instance from "./instance";
import processApiResponse from "@/utils/api";

const postCreateChatRoom = async ({ responseFunc, data, routeTo }) => {
    try {
        const response = await instance.post(`/api/chat/room?roomId=${data}`);
        processApiResponse({ responseFunc, response });
        return response;
    } catch (e) {
        routeTo("/error");
        return e.response;
    }
};

export default postCreateChatRoom;
