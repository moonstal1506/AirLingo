import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
    sessionId: "",
    studyId: "",
    otherUser: {},
    meetingData: {},
};

export const MeetingSlice = createSlice({
    name: "Meeting",
    initialState,
    reducers: {
        AddSessionId: (state, actions) => {
            state.sessionId = actions.payload.sessionId;
        },
        AddOtherUser: (state, actions) => {
            state.otherUser = actions.payload.otherUser;
        },
        AddStudyId: (state, actions) => {
            state.studyId = actions.payload.studyId;
        },
        AddMeetingData: (state, actions) => {
            state.meetingData = actions.payload.meetingData;
        },
        AddInfo: (state, actions) => {
            const { sessionId, otherUser, studyId } = actions.payload;
            state.sessionId = sessionId;
            state.otherUser = otherUser;
            state.studyId = studyId;
        },
        removeInfo: (state) => {
            state.sessionId = "";
            state.otherUser = {};
            state.studyId = "";
            state.meetingData = {};
        },
        extraReducers: (builder) => {
            builder.addCase(PURGE, () => initialState);
        },
    },
});

export const { AddSessionId, AddOtherUser, AddStudyId, AddMeetingData, AddInfo, removeInfo } =
    MeetingSlice.actions;
export const selectMeeting = (state) => state.Meeting;
export default MeetingSlice.reducer;
