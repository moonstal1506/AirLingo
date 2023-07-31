import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { combineReducers } from "@reduxjs/toolkit";
import User from "../features/User/UserSlice";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["User"],
};

const rootReducer = combineReducers({
    User,
});

export default persistReducer(persistConfig, rootReducer);
