import axiosInstance from "services/initRequest";

const configService = {
  fetchTypesOfDocuments: () => {
    const url = "/types-of-documents";
    return axiosInstance.get(url);
  },
  fetchCategories: () => {
    const url = "/categories";
    return axiosInstance.get(url);
  },
  fetchAgencies: () => {
    const url = "/agencies";
    return axiosInstance.get(url);
  },
  fetchUrgentLevels: () => {
    const url = "/urgent-levels";
    return axiosInstance.get(url);
  },
  fetchDepartments: () => {
    const url = "/departments";
    return axiosInstance.get(url);
  },
};

export default configService;
