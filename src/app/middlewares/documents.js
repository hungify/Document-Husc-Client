import { fetchDocuments } from "features/Home/homeSlice";
import { fetchRecipients } from "features/Recipients/recipientsSlice";

const { createListenerMiddleware, isAnyOf } = require("@reduxjs/toolkit");
const {
  setFiltersBy,
  setSearchForm,
  setSortBy,
  setPageSize,
  setPage,
} = require("features/SearchGroup/searchGroupSlice");

const documentListenerMiddleware = createListenerMiddleware();

documentListenerMiddleware.startListening({
  matcher: isAnyOf(setFiltersBy, setSearchForm, setPage, setPageSize, setSortBy),
  effect: async (action, listenerApi) => {
    const { dispatch } = listenerApi;
    console.log("🚀 :: action.payload.triggerBy", action.payload.triggerBy);
    if (action.payload.triggerBy === "documents") {
      dispatch(fetchDocuments());
    } else if (action.payload.triggerBy === "recipients") {
      dispatch(fetchRecipients());
    }
  },
});

export default documentListenerMiddleware.middleware;
