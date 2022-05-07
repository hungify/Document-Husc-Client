import axiosInstance from "services/initRequest";

const categoriesService = {
  fetchCategories: () => {
    const url = "categories";
    return axiosInstance.get(url);
  },
};

export default categoriesService;
