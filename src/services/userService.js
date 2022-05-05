import axiosInstance from "services/initRequest";

const userService = {
  fetchProfile: () => {
    const url = "users/profile";
    return axiosInstance.get(url);
  },
};

export default userService;
