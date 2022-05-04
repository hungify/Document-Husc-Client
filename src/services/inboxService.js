import axiosInstance from "services/initRequest";

const inboxService = {
  getInboxDocuments: function ({ page, pageSize, orderBy }) {
    const url = `/inbox`;
    return axiosInstance.get(url, {
      params: { page, limit: pageSize, orderBy },
    });
  },
  forwardDocuments: function (documentId, receivers) {
    const url = `/documents/${documentId}/forward`;
    return axiosInstance.patch(url, { receivers });
  },
};

export default inboxService;
