export const getDocuments = (state) => state.documents.documents;
export const getRelatedDocuments = (state) => state.documents.relatedDocuments;
export const getTotalDocuments = (state) => state.documents.total;
export const getTotalDocumentsMatch = (state) => state.documents.totalMatch;

export const getLoadingIssueDocument = (state) => state.documents.loading;
export const getErrorIssueDocument = (state) => state.documents.error;
export const getSuccessIssueDocument = (state) => state.documents.success;
export const getMessageIssueDocument = (state) => state.documents.message;
