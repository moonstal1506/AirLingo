import instance from "./instance";
import { getLogout, loginUser } from "./auth";
import { getUserProfile, postSignUp } from "./user";
import { getLanguage, getGrade } from "./language";
import getTranslateResult from "./translator";
import { getConcurrentUser, postMatching, postOpenviduToken, getPremiumMatching } from "./matching";
import { getCardCode, getCard } from "./card";
import { postEvaluate, getRecordStatistic, postStopRecording, postStartRecording } from "./record";
import postCreateChatRoom from "./chat";

export {
    instance,
    loginUser,
    getLogout,
    getUserProfile,
    postSignUp,
    getLanguage,
    getGrade,
    getTranslateResult,
    getConcurrentUser,
    postMatching,
    postOpenviduToken,
    getCardCode,
    getCard,
    postEvaluate,
    getRecordStatistic,
    postCreateChatRoom,
    postStopRecording,
    postStartRecording,
    getPremiumMatching,
};
