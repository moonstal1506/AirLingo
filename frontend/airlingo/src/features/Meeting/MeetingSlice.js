import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
    sessionId: "",
    openviduToken: "",
    otherUser: {},
};

export const MeetingSlice = createSlice({
    name: "Meeting",
    initialState,
    reducers: {
        AddSessionId: (state, actions) => {
            state.sessionId = actions.payload.sessionId;
        },
        AddOpenviduToken: (state, actions) => {
            state.openviduToken = actions.payload.openviduToken;
        },
        AddOtherUser: (state, actions) => {
            state.otherUser = actions.payload.otherUser;
        },
        AddInfo: (state, actions) => {
            const { sessionId, openviduToken, otherUser } = actions.payload;
            state.sessionId = sessionId;
            state.openviduToken = openviduToken;
            state.otherUser = otherUser;
        },
        removeInfo: (state) => {
            state.sessionId = "";
            state.openviduToken = "";
            state.otherUser = {};
        },
        extraReducers: (builder) => {
            builder.addCase(PURGE, () => initialState);
        },
    },
});

export const { AddSessionId, AddOpenviduToken, AddOtherUser, AddInfo, removeInfo } =
    MeetingSlice.actions;
export const selectMeeting = (state) => state.Meeting;
export default MeetingSlice.reducer;
