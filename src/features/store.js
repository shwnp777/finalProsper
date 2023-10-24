import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import messageReducer from "./message";

const reducers = {
  // profile: profilesReducer,
  message: messageReducer,
  user: userReducer,
};

export const store = configureStore({
  reducer: reducers,
});
