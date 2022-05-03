import axiosInstance from "services/initRequest";

const inboxService = {
  getInbox: function ({ page, pageSize, orderBy, userId }) {
    const url = "/inbox";
    return axiosInstance.get(url, {
      params: { userId, page, limit: pageSize, orderBy },
    });
  },
};

export default inboxService;
