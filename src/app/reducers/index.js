import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "features/Auth/authSlice";
import documentDetailsSlice from "features/DocumentDetails/documentDetailsSlice";
import homeSlice from "features/Home/homeSlice";
import issueDocumentSlice from "features/IssueDocument/issueDocumentSlice";

export const rootReducer = combineReducers({
  auth: authSlice,
  home: homeSlice,
  documentDetails: documentDetailsSlice,
  issueDocument: issueDocumentSlice,
});
