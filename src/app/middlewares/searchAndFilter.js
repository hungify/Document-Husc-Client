import { fetchDocuments } from "features/ManageDocuments/documentsSlice";
import { fetchRecipients } from "features/Recipients/recipientsSlice";
const { createListenerMiddleware, isAnyOf } = require("@reduxjs/toolkit");
const {
  setFiltersBy,
  setSearchForm,
  setSortBy,
  setPageSize,
  setPage,
} = require("features/SearchGroup/searchGroupSlice");

const searchAndFilterMiddleware = createListenerMiddleware();

searchAndFilterMiddleware.startListening({
  matcher: isAnyOf(setFiltersBy, setSearchForm, setPage, setPageSize, setSortBy),
  effect: async (action, listenerApi) => {
    const { dispatch } = listenerApi;
    if (setPageSize.match(action)) {
    } else {
      if (action.payload.triggerBy === "documents") {
        dispatch(fetchDocuments());
      } else if (action.payload.triggerBy === "recipients") {
        dispatch(fetchRecipients());
      }
    }
  },
});

export default searchAndFilterMiddleware.middleware;
