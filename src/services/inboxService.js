import axiosInstance from "services/initRequest";

const inboxService = {
  getInboxDocuments: function ({ page, pageSize, orderBy }) {
    const url = `inbox`;
    return axiosInstance.get(url, {
      params: { page, limit: pageSize, orderBy },
    });
  },
  forwardDocuments: function (documentId, receivers) {
    const url = `send/${documentId}/forward`;
    return axiosInstance.patch(url, { receivers });
  },
  updateReadDocument: (documentId, readDate) => {
    const url = `inbox/${documentId}/read`;
    return axiosInstance.patch(url, {
      readDate,
    });
  },
};

export default inboxService;
