import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
    sessionId: "",
    recordingId: "",
    studyId: "",
    scriptData: {},
    otherUser: {},
    meetingData: {},
    didReport: false,
    screenMode: "FreeTalk",
    isShareOn: false,
    chatList: [],
};

export const MeetingSlice = createSlice({
    name: "Meeting",
    initialState,
    reducers: {
        addSessionId: (state, actions) => {
            state.sessionId = actions.payload.sessionId;
        },
        addRecordingId: (state, actions) => {
            state.recordingId = actions.payload.recordingId;
        },
        addOtherUser: (state, actions) => {
            state.otherUser = actions.payload.otherUser;
        },
        addStudyId: (state, actions) => {
            state.studyId = actions.payload.studyId;
        },
        addMeetingData: (state, actions) => {
            state.meetingData = actions.payload.meetingData;
        },
        addInfo: (state, actions) => {
            const { sessionId, otherUser, studyId } = actions.payload;
            state.sessionId = sessionId;
            state.otherUser = otherUser;
            state.studyId = studyId;
        },
        addDidReport: (state, actions) => {
            state.didReport = actions.payload.didReport;
        },
        addScriptData: (state, actions) => {
            state.scriptData = { ...state.scriptData, ...actions.payload.scriptData };
        },
        addScreenMode: (state, actions) => {
            state.screenMode = actions.payload.screenMode;
        },
        addIsShareOn: (state, actions) => {
            state.isShareOn = actions.payload.isShareOn;
        },
        addChatList: (state, actions) => {
            state.chatList.push(actions.payload.chat);
        },
        removeInfo: (state) => {
            state.sessionId = "";
            state.otherUser = {};
            state.studyId = "";
            state.meetingData = {};
            state.recordingId = "";
            state.scriptData = {};
            state.screenMode = "FreeTalk";
            state.chatList = [];
        },
        removeScriptData: (state) => {
            state.scriptData = {};
        },
        removeRecordingId: (state) => {
            state.recordingId = "";
        },
        removeMeetingData: (state) => {
            state.meetingData = {};
        },
        extraReducers: (builder) => {
            builder.addCase(PURGE, () => initialState);
        },
    },
});

export const {
    addSessionId,
    addRecordingId,
    addOtherUser,
    addStudyId,
    addMeetingData,
    addInfo,
    addDidReport,
    addScriptData,
    addScreenMode,
    addIsShareOn,
    addChatList,
    removeScriptData,
    removeRecordingId,
    removeInfo,
    removeMeetingData,
} = MeetingSlice.actions;
export const selectMeeting = (state) => state.Meeting;
export default MeetingSlice.reducer;
