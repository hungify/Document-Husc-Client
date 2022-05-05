import axiosInstance from "services/initRequest";

const sentService = {
  getSentDocuments: ({ page, pageSize }) => {
    const url = `/send`;
    return axiosInstance.get(url, {
      params: { page, limit: pageSize },
    });
  },
};

export default sentService;
