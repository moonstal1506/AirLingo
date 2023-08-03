import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { combineReducers } from "@reduxjs/toolkit";
import User from "../features/User/UserSlice";
import Meeting from "@/features/Meeting/MeetingSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["User", "Meeting"],
};

const rootReducer = combineReducers({
    User,
    Meeting,
});

export default persistReducer(persistConfig, rootReducer);
