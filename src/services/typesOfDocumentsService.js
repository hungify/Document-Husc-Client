import axiosInstance from "services/initRequest";

const typeOfDocumentsService = {
  fetchTypesOfDocuments: () => {
    const url = "types-of-documents";
    return axiosInstance.get(url);
  },
  fetchCreateTypesOfDocuments: (label) => {
    const url = "types-of-documents";
    return axiosInstance.post(url, { label });
  },
  fetchUpdateTypesOfDocuments: ({ typeOfDocumentId, label }) => {
    const url = `types-of-documents/${typeOfDocumentId}`;
    return axiosInstance.put(url, { label });
  },
};

export default typeOfDocumentsService;
