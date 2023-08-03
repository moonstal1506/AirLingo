import instance from "./instance";
import { getLogout, loginUser } from "./auth";
import getUserProfile from "./user";
import getLanguage from "./language";
import { getConcurrentUser, postMatching } from "./matching";

export {
    instance,
    loginUser,
    getLogout,
    getUserProfile,
    getLanguage,
    getConcurrentUser,
    postMatching,
};
