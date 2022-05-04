import axiosInstance from "services/initRequest";

const sentService = {
  getSentDocuments: ({ page, pageSize }) => {
    const url = `/sent`;
    return axiosInstance.get(url, {
      params: { page, limit: pageSize },
    });
  },
};

export default sentService;
