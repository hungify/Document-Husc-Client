import axiosInstance from "services/initRequest";

const agencyService = {
  fetchAgencies: () => {
    const url = "agencies";
    return axiosInstance.get(url);
  },
  fetchCreateAgencies: (label) => {
    const url = "agencies";
    return axiosInstance.post(url, { label });
  },
  fetchUpdateAgencies: ({ agencyId, label }) => {
    const url = `agencies/${agencyId}`;
    return axiosInstance.put(url, { label });
  },
};

export default agencyService;
