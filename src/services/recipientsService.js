import axiosInstance from "services/initRequest";
const recipientsService = {
  getRecipients: () => {
    const url = "/users";
    return axiosInstance.get(url);
  },
};

export default recipientsService;
