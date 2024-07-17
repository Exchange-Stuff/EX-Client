import axios from 'axios';
import {getAccessToken, getRefreshToken, refreshAccessToken, logout} from '../services/authService';

// https://haddock-wise-mallard.ngrok-free.app/api
// http://localhost:5059/api
// 'ngrok-skip-browser-warning': 'true',

export const instance = axios.create({
	baseURL: 'https://haddock-wise-mallard.ngrok-free.app/api',
	headers: {
		'ngrok-skip-browser-warning': 'true',
	},
});

instance.interceptors.request.use(
	async (config) => {
		let token = getAccessToken();

		if (!token) {
			try {
				token = await refreshAccessToken();
				if (!token) {
					window.location.href = 'http://localhost:3000/login';
					throw new Error('No refresh token available');
				}
			} catch (error) {
				window.location.href = 'http://localhost:3000/login';
				console.log('Error refreshing token:', error);
				throw error;
			}
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
					localStorage.setItem('accessToken', newToken);
					originalRequest.headers.Authorization = `Bearer ${newToken}`;

					return instance(originalRequest);
				}
			} catch (err) {
				console.log('Error renewing token:', err);
				logout();
				throw new Error('No refresh token available');
			}
		}

		return Promise.reject(error);
	}
);

export default instance;
