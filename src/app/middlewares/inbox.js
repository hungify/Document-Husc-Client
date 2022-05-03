const { createListenerMiddleware, isAnyOf } = require("@reduxjs/toolkit");
const {
  fetchInboxDocuments,
  setPage,
  setPageSize,
  setOrderBy,
} = require("features/InboxDocuments/inboxDocumentsSlice");

const inboxListenerMiddleware = createListenerMiddleware();

inboxListenerMiddleware.startListening({
  matcher: isAnyOf(setPage, setPageSize, setOrderBy),
  effect: async (action, listenerApi) => {
    const { dispatch } = listenerApi;
    dispatch(fetchInboxDocuments());
  },
});

export default inboxListenerMiddleware.middleware;
