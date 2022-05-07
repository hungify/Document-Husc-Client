import { configureStore } from "@reduxjs/toolkit";
import middlewares from "app/middlewares";
import persistedReducer from "app/reducers";
import { initRequest } from "services/initRequest";

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
  devTools: process.env.NODE_ENV !== "production",
});

initRequest(store);
export default store;
