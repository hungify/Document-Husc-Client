import axiosInstance from "services/initRequest";

const sentService = {
  getSentDocuments: async ({ userId, page, pageSize }) => {
    const url = `/sent/${userId}`;
    return await axiosInstance.get(url, {
      params: { page, limit: pageSize },
    });
  },
};

export default sentService;
