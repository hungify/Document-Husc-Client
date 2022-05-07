import axiosInstance from "services/initRequest";

const typeOfDocumentService = {
  fetchTypesOfDocuments: () => {
    const url = "types-of-documents";
    return axiosInstance.get(url);
  },
};

export default typeOfDocumentService;
