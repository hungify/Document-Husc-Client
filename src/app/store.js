import { configureStore } from "@reduxjs/toolkit";
import documentListenerMiddleware from "app/middlewares/documents";
import { rootReducer } from "app/reducers";
import logger from "redux-logger";
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { initRequest } from "services/initRequest";
import inboxListenerMiddleware from "app/middlewares/inbox";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["auth", "home", "searchGroup", "recipients", "issueDocument"],
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .prepend(documentListenerMiddleware, inboxListenerMiddleware)
      .concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

initRequest(store);
export default store;
