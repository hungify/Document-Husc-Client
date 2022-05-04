import axiosInstance from "services/initRequest";

const dashboardService = {
  fetchAnalytics: () => {
    const url = "/dashboard/analytics";
    return axiosInstance.get(url);
  },
};

export default dashboardService;
