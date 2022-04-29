import axiosInstance from "services/initRequest";

const documentsService = {
  getDocuments: () => {
    const url = "/documents";
    return axiosInstance.get(url);
  },
  getDocumentDetail: (documentId) => {
    const url = `/documents/${documentId}`;
    return axiosInstance.get(url);
  },
  getDocumentsByIds: (ids) => {
    const url = "/documents?ids=".concat(ids.join(","));
    return axiosInstance.get(url);
  },
  issueDocument: (formData) => {
    const url = "/documents";
    return axiosInstance.post(url, formData);
  },
};

export default documentsService;
