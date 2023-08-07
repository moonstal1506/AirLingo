import instance from "./instance";
import { getLogout, loginUser } from "./auth";
import getUserProfile from "./user";
import getLanguage from "./language";
import { getConcurrentUser, postMatching, postOpenviduToken } from "./matching";
import { getCardCode, getCard } from "./card";
import postCreateChatRoom from "./chat";

export {
    instance,
    loginUser,
    getLogout,
    getUserProfile,
    getLanguage,
    getConcurrentUser,
    postMatching,
    postOpenviduToken,
    getCardCode,
    getCard,
    postCreateChatRoom,
};
