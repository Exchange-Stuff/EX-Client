// src/utils/axios.js
import axios from 'axios';
import { getAccessToken, getRefreshToken, refreshAccessToken, logout } from '../services/authService';

const baseURL = 'http://localhost:5059/api';
export const instance = axios.create({
  baseURL: 'http://localhost:5059/api',
});

// Thêm token vào header của mỗi yêu cầu
instance.interceptors.request.use(async (config) => {
  let token = getAccessToken();

  // Nếu token đã hết hạn, refresh token
  if (!token) {
    token = await refreshAccessToken();
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      // call refresh token
      originalRequest._retry = true;
      return axios
        .post(baseURL + "/refresh", {
          refreshToken: getRefreshToken(),
        })
        .then((res) => {
          if (res.data.isSuccess === true) {
            localStorage.setItem("accessToken", res.data.Value);
            originalRequest.headers.Authorization = `Bearer ${res.data.Value}`;
            return instance(originalRequest);
          }
        })
        .catch((error) => {
          console.log("error in refresh token", error);
          logout();
          window.location.href = "/";
          return Promise.reject(error);
        });
    }
    return Promise.reject(error);
  }
);

export default instance;
