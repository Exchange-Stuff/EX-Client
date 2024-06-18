import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

// Đăng xuất người dùng và xóa JWT khỏi localStorage
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

// Lấy thông tin người dùng hiện tại
export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem('accessToken');
    return jwtDecode(token);
  } catch (ex) {
    return null;
  }
};

// Kiểm tra xem người dùng có đang đăng nhập hay không
export const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return false;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return decodedToken.exp > currentTime;
};

// Lấy accessToken
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Lấy refreshToken
export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

// Refresh token function (nếu cần)
export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) throw new Error('No refresh token available');

  const response = await axios.post('http://localhost:5059/api/Auth/refresh', { refreshToken });
  const { accessToken } = response.data;

  localStorage.setItem('accessToken', accessToken);
  return accessToken;
};
