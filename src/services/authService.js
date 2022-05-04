import axiosInstance from "services/initRequest";

const authService = {
  login: ({ email, password }) => {
    const url = "auth/login";
    return axiosInstance.post(url, {
      email,
      password,
    });
  },
  register: ({ username, email, password }) => {
    const url = "auth/register";
    return axiosInstance.post(url, {
      username,
      email,
      password,
    });
  },
  refreshToken: (refreshToken) => {
    const url = "auth/refresh-token";
    return axiosInstance.post(url, {
      refreshToken,
    });
  },
  logout: (refreshToken) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (refreshToken === "321" || refreshToken === "4321") {
          resolve({
            message: "Đăng xuất thành công",
            status: 200,
          });
        } else {
          reject({
            response: {
              data: {
                message: "Unauthorized",
                status: 401,
              },
            },
          });
        }
      }, 1000);
    });
    // const url = "auth/logout";
    // return axiosInstance.delete(url, {
    //   data: {
    //     refreshToken,
    //   },
    // });
  },
};

export default authService;
