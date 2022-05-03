import { fetchDocuments } from "features/Home/homeSlice";

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
    dispatch(fetchDocuments());
  },
});

export default documentListenerMiddleware.middleware;
