const { default: axiosInstance } = require("services/initRequest");

const archiveService = {
  fetchArchivesDocuments: () => {
    const url = "/archives";
    return axiosInstance.get(url);
  },
  fetchRestoreDocument: (documentId) => {
    const url = `/archives/${documentId}`;
    return axiosInstance.patch(url);
  },
};

export default archiveService;
