import axiosInstance from "services/initRequest";

const agencyService = {
  fetchAgencies: () => {
    const url = "agencies";
    return axiosInstance.get(url);
  },
};

export default agencyService;
