// src/utils/axios.js
import axios from 'axios';
import {getAccessToken, getRefreshToken, refreshAccessToken, logout} from '../services/authService';

export const instance = axios.create({
	baseURL: 'http://localhost:5059/api',
});

instance.interceptors.request.use(
	async (config) => {
		let token = getAccessToken();

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
		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		if (error.response && error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			const oldAccessToken = getAccessToken();
			try {
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
