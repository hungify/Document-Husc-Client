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
  fetchUpdateCategory: ({ title, categoryId }) => {
    const url = `categories/${categoryId}`;
    return axiosInstance.patch(url, { title });
  },
};

export default categoriesService;
