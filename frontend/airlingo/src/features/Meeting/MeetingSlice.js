import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
    sessionId: "",
    recordingId: "",
    studyId: "",
    scriptData: [],
    otherUser: {},
    meetingData: {},
    didReport: false,
    screenMode: "FreeTalk",
    isShareOn: false,
};

export const MeetingSlice = createSlice({
    name: "Meeting",
    initialState,
    reducers: {
        AddSessionId: (state, actions) => {
            state.sessionId = actions.payload.sessionId;
        },
        AddRecordingId: (state, actions) => {
            state.recordingId = actions.payload.recordingId;
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
        AddDidReport: (state, actions) => {
            state.didReport = actions.payload.didReport;
        },
        AddScriptData: (state, actions) => {
            state.scriptData = actions.payload.scriptData;
        },
        AddScreenMode: (state, actions) => {
            state.screenMode = actions.payload.screenMode;
        },
        AddIsShareOn: (state, actions) => {
            state.isShareOn = actions.payload.isShareOn;
        },
        removeInfo: (state) => {
            state.sessionId = "";
            state.otherUser = {};
            state.studyId = "";
            state.meetingData = {};
            state.recordingId = "";
            state.scriptData = [];
            state.screenMode = "FreeTalk";
        },
        removeRecordingId: (state) => {
            state.recordingId = "";
        },
        extraReducers: (builder) => {
            builder.addCase(PURGE, () => initialState);
        },
    },
});

export const {
    AddSessionId,
    AddRecordingId,
    AddOtherUser,
    AddStudyId,
    AddMeetingData,
    AddInfo,
    AddDidReport,
    AddScriptData,
    AddScreenMode,
    AddIsShareOn,
    removeRecordingId,
    removeInfo,
} = MeetingSlice.actions;
export const selectMeeting = (state) => state.Meeting;
export default MeetingSlice.reducer;
