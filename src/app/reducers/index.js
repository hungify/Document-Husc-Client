import { combineReducers } from "@reduxjs/toolkit";
import configSlice from "app/reducers/configSlice";
import authSlice from "features/Auth/authSlice";
import dashboardSlice from "features/Dashboard/dashboardSlice";
import documentDetailsSlice from "features/DocumentDetails/documentDetailsSlice";
import homeSlice from "features/Home/homeSlice";
import inboxDocumentsSlice from "features/InboxDocuments/inboxDocumentsSlice";
import issueDocumentSlice from "features/IssueDocument/issueDocumentSlice";
import recipientsSlice from "features/Recipients/recipientsSlice";
import searchGroupSlice from "features/SearchGroup/searchGroupSlice";
import sentDocumentsSlice from "features/SentDocuments/sentDocumentsSlice";

export const rootReducer = combineReducers({
  config: configSlice,
  auth: authSlice,
  home: homeSlice,
  documentDetails: documentDetailsSlice,
  issueDocument: issueDocumentSlice,
  recipients: recipientsSlice,
  searchGroup: searchGroupSlice,
  inbox: inboxDocumentsSlice,
  sent: sentDocumentsSlice,
  dashboard: dashboardSlice
});
