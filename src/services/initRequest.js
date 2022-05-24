import axios from "axios";
import { fetchLogout, fetchRefreshToken } from "features/Auth/authSlice";
import queryString from "query-string";
const requestConfig = {
  baseURL: `${process.env.REACT_APP_API_ENDPOINT}/api/v1`,
  paramsSerializer: (params) => {
    return queryString.stringify(params);
  },
};

export const axiosInstance = axios.create(requestConfig);
export const initRequest = (store) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const accessToken = store?.getState()?.auth?.accessToken;
      if (!config.headers.Authorization && accessToken) {
        config.headers.Authorization = accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (response) => {
      if (response && response.data) {
        return response.data;
      }
      return response;
    },
    (error) => {
      const { status } = error.response;
      const { message } = error.response.data;
      if (status === 401) {
        const refreshToken = store?.getState()?.auth?.refreshToken;
        if (message === "access token has expired") {
          if (refreshToken) {
            store.dispatch(fetchRefreshToken(refreshToken));
          }
        } else if (message === "refresh token has expired") {
          store.dispatch(fetchLogout(refreshToken));
        }
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
