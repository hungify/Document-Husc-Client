import axiosInstance from "services/initRequest";

const inboxService = {
  getInbox: function ({ page, pageSize, orderBy, userId }) {
    const url = "/inbox";
    return axiosInstance.get(url, {
      params: { userId, page, limit: pageSize, orderBy },
    });
  },
  forwardDocuments: function (userId, documentId, receivers) {
    const url = `/documents/${documentId}/sender/${userId}/forward`;
    return axiosInstance.patch(url, { receivers });
  },
};

export default inboxService;
