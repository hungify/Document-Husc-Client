import { combineReducers } from "@reduxjs/toolkit";
import urgentLevelsSlice from "app/reducers/configs/urgentLevelsSlice";
import archiveSlice from "features/ArchiveDocuments/archivesSlice";
import authSlice, { fetchLogout } from "features/Auth/authSlice";
import dashboardSlice from "features/Dashboard/dashboardSlice";
import documentDetailsSlice from "features/DocumentDetails/documentDetailsSlice";
import draftSlice from "features/DraftDocuments/draftSlice";
import inboxDocumentsSlice from "features/InboxDocuments/inboxDocumentsSlice";
import agenciesSlice from "features/ManageAgencies/agenciesSlice";
import categoriesSlice from "features/ManageCategories/categoriesSlice";
import departmentsSlice from "features/ManageDepartments/departmentsSlice";
import documentsSlice from "features/ManageDocuments/documentsSlice";
import typesOfDocumentsSlice from "features/ManageTypesOfDocuments/typesOfDocumentSlice";
import profileSlice from "features/Profile/profileSlice";
import recipientsSlice from "features/Recipients/recipientsSlice";
import searchGroupSlice from "features/SearchGroup/searchGroupSlice";
import sentDocumentsSlice from "features/SentDocuments/sentDocumentsSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const combinedReducer = combineReducers({
  // configs
  typesOfDocuments: typesOfDocumentsSlice,
  categories: categoriesSlice,
  agencies: agenciesSlice,
  departments: departmentsSlice,
  urgentLevels: urgentLevelsSlice,
  // features
  auth: authSlice,
  documentDetails: documentDetailsSlice,
  documents: documentsSlice,
  recipients: recipientsSlice,
  searchGroup: searchGroupSlice,
  inbox: inboxDocumentsSlice,
  sent: sentDocumentsSlice,
  dashboard: dashboardSlice,
  profile: profileSlice,
  archives: archiveSlice,
  draft: draftSlice,
});

const rootReducer = (state, action) => {
  if (action.type === fetchLogout.fulfilled.type) {
    state = undefined;
  }

  return combinedReducer(state, action);
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["home", "searchGroup", "recipients", "issueDocument"],
  whitelist: ["auth", "typesOfDocuments", "categories", "agencies", "departments", "urgentLevels"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
