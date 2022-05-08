import { combineReducers } from "@reduxjs/toolkit";
import agenciesSlice from "app/reducers/configs/agenciesSlice";
import categoriesSlice from "app/reducers/configs/categoriesSlice";
import departmentsSlice from "app/reducers/configs/departmentsSlice";
import typesOfDocumentsSlice from "app/reducers/configs/typesOfDocumentsSlice";
import urgentLevelsSlice from "app/reducers/configs/urgentLevelsSlice";
import authSlice from "features/Auth/authSlice";
import dashboardSlice from "features/Dashboard/dashboardSlice";
import documentDetailsSlice from "features/DocumentDetails/documentDetailsSlice";
import homeSlice from "features/Home/homeSlice";
import inboxDocumentsSlice from "features/InboxDocuments/inboxDocumentsSlice";
import issueDocumentSlice from "features/ManageDocuments/issueDocumentSlice";
import profileSlice from "features/Profile/profileSlice";
import recipientsSlice from "features/Recipients/recipientsSlice";
import searchGroupSlice from "features/SearchGroup/searchGroupSlice";
import sentDocumentsSlice from "features/SentDocuments/sentDocumentsSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  // configs
  typesOfDocuments: typesOfDocumentsSlice,
  categories: categoriesSlice,
  agencies: agenciesSlice,
  departments: departmentsSlice,
  urgentLevels: urgentLevelsSlice,
  // features
  auth: authSlice,
  home: homeSlice,
  documentDetails: documentDetailsSlice,
  issueDocument: issueDocumentSlice,
  recipients: recipientsSlice,
  searchGroup: searchGroupSlice,
  inbox: inboxDocumentsSlice,
  sent: sentDocumentsSlice,
  dashboard: dashboardSlice,
  profile: profileSlice,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["auth", "home", "searchGroup", "recipients", "issueDocument"],
  whitelist: ["typesOfDocuments", "categories", "agencies", "departments"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
