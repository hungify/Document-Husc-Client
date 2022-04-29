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
};

export default documentsService;
