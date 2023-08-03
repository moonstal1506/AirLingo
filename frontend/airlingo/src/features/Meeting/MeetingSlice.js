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
        AddInfo: (state, actions) => {},
        extraReducers: (builder) => {
            builder.addCase(PURGE, () => initialState);
        },
    },
});

export const { signinUser, logoutUser, reloadUser } = MeetingSlice.actions;
export const selectMeeting = (state) => state.User;
export default MeetingSlice.reducer;
