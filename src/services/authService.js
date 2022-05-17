import axiosInstance from "services/initRequest";

const authService = {
  login: ({ email, password }) => {
    const url = "auth/login";
    return axiosInstance.post(url, {
      email,
      password,
    });
  },
  register: ({ username, email, password, department, role }) => {
    const url = "auth/register";
    return axiosInstance.post(url, {
      username,
      email,
      password,
      department,
      role,
    });
  },
  refreshToken: (refreshToken) => {
    const url = "auth/refresh-token";
    return axiosInstance.post(url, {
      refreshToken,
    });
  },
  logout: (refreshToken) => {
    const url = `auth/logout/${refreshToken}`;
    return axiosInstance.delete(url);
  },
};

export default authService;
