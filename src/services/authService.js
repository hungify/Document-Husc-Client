import axiosInstance from "services/initRequest";

const authService = {
  login: ({ username, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin" && password === "admin") {
          resolve({
            accessToken: "1234",
            refreshToken: "4321",
            role: "ADMIN",
            message: "Login success",
            status: 200,
          });
        } else if (username === "user" && password === "user") {
          resolve({
            accessToken: "123",
            refreshToken: "321",
            role: "USER",
            message: "Login success",
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
    // const url = "auth/login";
    // return axiosInstance.post(url, {
    //   email: email,
    //   password: password,
    // });
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
            message: "Logout success",
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
