// src/utils/axios.js
import axios from 'axios';
import { getAccessToken, refreshAccessToken } from '../services/authService';

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
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
