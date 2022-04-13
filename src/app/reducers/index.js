import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "features/Auth/authSlice";

export const rootReducer = combineReducers({
  auth: authSlice,
});
