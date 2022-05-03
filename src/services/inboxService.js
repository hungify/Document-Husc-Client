import axiosInstance from "services/initRequest";

const inboxService = {
  getInboxDocuments: function ({ page, pageSize, orderBy, userId }) {
    const url = `/inbox/${userId}`;
    return axiosInstance.get(url, {
      params: { page, limit: pageSize, orderBy },
    });
  },
  forwardDocuments: function (userId, documentId, receivers) {
    const url = `/documents/${documentId}/sender/${userId}/forward`;
    return axiosInstance.patch(url, { receivers });
  },
};

export default inboxService;
