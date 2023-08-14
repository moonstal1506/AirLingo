import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
    isLogIn: false,
    userId: "",
    userLoginId: "",
    userNickname: "",
    userImgUrl: "",
    userAccessToken: "",
    userNativeLanguage: {},
    userLanguages: [],
    userBio: "",
};

export const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        signinUser: (state, actions) => {
            const {
                userId,
                userLoginId,
                userNickname,
                userImgUrl,
                userAccessToken,
                userNativeLanguage,
                userLanguages,
                userBio,
            } = actions.payload;
            state.isLogIn = true;
            state.userId = userId;
            state.userLoginId = userLoginId;
            state.userNickname = userNickname;
            state.userImgUrl = userImgUrl;
            state.userAccessToken = userAccessToken;
            state.userNativeLanguage = userNativeLanguage;
            state.userLanguages = userLanguages;
            state.userBio = userBio;
        },
        logoutUser: (state) => {
            state.isLogIn = false;
            state.userId = "";
            state.userLoginId = "";
            state.userNickname = "";
            state.userImgUrl = "";
            state.userAccessToken = "";
            state.userNativeLanguage = {};
            state.userLanguages = [];
            state.userBio = "";
        },
        reloadUser: (state, actions) => {
            const { userAccessToken } = actions.payload;
            state.isLogIn = true;
            state.userAccessToken = userAccessToken;
        },
        extraReducers: (builder) => {
            builder.addCase(PURGE, () => initialState);
        },
    },
});

export const { signinUser, logoutUser, reloadUser } = UserSlice.actions;
export const selectUser = (state) => state.User;
export default UserSlice.reducer;
