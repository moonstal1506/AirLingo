import instance from "./instance";
import { getLogout, loginUser } from "./auth";
import getUserProfile from "./user";
import { getLanguage, getGrade } from "./language";
import { getConcurrentUser, postMatching, postOpenviduToken } from "./matching";
import { getCardCode, getCard } from "./card";
import { postEvaluate, getRecordStatistic } from "./record";
import postCreateChatRoom from "./chat";

export {
    instance,
    loginUser,
    getLogout,
    getUserProfile,
    getLanguage,
    getGrade,
    getConcurrentUser,
    postMatching,
    postOpenviduToken,
    getCardCode,
    getCard,
    postEvaluate,
    getRecordStatistic,
    postCreateChatRoom,
};
