import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
    sessionId: "",
    studyId: "",
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
        AddStudyId: (state, actions) => {
            state.studyId = actions.payload.studyId;
        },
        AddInfo: (state, actions) => {
            const { sessionId, openviduToken, otherUser, studyId } = actions.payload;
            state.sessionId = sessionId;
            state.openviduToken = openviduToken;
            state.otherUser = otherUser;
            state.studyId = studyId;
        },
        removeInfo: (state) => {
            state.sessionId = "";
            state.openviduToken = "";
            state.otherUser = {};
            state.studyId = "";
        },
        extraReducers: (builder) => {
            builder.addCase(PURGE, () => initialState);
        },
    },
});

export const { AddSessionId, AddOpenviduToken, AddOtherUser, AddStudyId, AddInfo, removeInfo } =
    MeetingSlice.actions;
export const selectMeeting = (state) => state.Meeting;
export default MeetingSlice.reducer;
