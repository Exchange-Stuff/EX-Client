// src/utils/axios.js
import axios from 'axios';
import {getAccessToken, getRefreshToken, refreshAccessToken, logout} from '../services/authService';

export const instance = axios.create({
	baseURL: 'https://haddock-wise-mallard.ngrok-free.app//api',
});

// Thêm token vào header của mỗi yêu cầu
instance.interceptors.request.use(
	async (config) => {
		let token = getAccessToken();

		// Nếu token đã hết hạn, refresh token
		if (!token) {
			token = await refreshAccessToken();
		}

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => {
		// Tùy chỉnh response nếu cần trước khi trả về then hoặc catch
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		if (error.response && error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			// Lấy token cũ
			const oldAccessToken = getAccessToken();
			try {
				// Xét điều kiện
				const res = await axios.post(
					'http://localhost:5059/api/Auth/renew',
					{
						refreshToken: getRefreshToken(),
					},
					{
						headers: {
							Authorization: `Bearer ${oldAccessToken}`,
						},
					}
				);

				if (res.data.isSuccess) {
					const newToken = res.data.value.accessToken;
					console.log('newToken', newToken);
					localStorage.setItem('accessToken', newToken);
					originalRequest.headers.Authorization = `Bearer ${newToken}`;

					// Thử lại yêu cầu ban đầu với token mới
					return instance(originalRequest);
				}
			} catch (err) {
				console.log('Lỗi khi làm mới token', err);
				logout();
				window.location.href = '/';
				return Promise.reject(err);
			}
		}

		return Promise.reject(error);
	}
);

export default instance;
