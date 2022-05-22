import { fetchLogout } from "features/Auth/authSlice";
import { resetDocumentDetail } from "features/DocumentDetails/documentDetailsSlice";
import { resetDraft } from "features/DraftDocuments/draftSlice";
import { resetInbox } from "features/InboxDocuments/inboxDocumentsSlice";
import { resetSent } from "features/SentDocuments/sentDocumentsSlice";

const { createListenerMiddleware, isAnyOf } = require("@reduxjs/toolkit");

const resetMiddleware = createListenerMiddleware();

resetMiddleware.startListening({
  matcher: isAnyOf(fetchLogout.fulfilled),
  effect: async (action, listenerApi) => {
    const { dispatch } = listenerApi;
    dispatch(resetInbox());
    dispatch(resetSent());
    dispatch(resetDocumentDetail());
    dispatch(resetDraft());
  },
});

export default resetMiddleware.middleware;
