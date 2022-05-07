import axiosInstance from "services/initRequest";

const urgentLevelsService = {
  fetchUrgentLevels: () => {
    const url = "urgent-levels";
    return axiosInstance.get(url);
  },
};

export default urgentLevelsService;
