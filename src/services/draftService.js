const { default: axiosInstance } = require("services/initRequest");

const draftsService = {
  fetchDraftDocument: () => {
    const url = "/draft";
    return axiosInstance.get(url);
  },
};

export default draftsService;
