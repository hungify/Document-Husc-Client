import axiosInstance from "services/initRequest";

const categoriesService = {
  fetchCategories: () => {
    const url = "categories";
    return axiosInstance.get(url);
  },
  fetchCreateCategory: ({ title, parentId }) => {
    const url = "categories";
    return axiosInstance.post(url, { title, parentId });
  },
};

export default categoriesService;
