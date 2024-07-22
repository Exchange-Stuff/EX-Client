import axios from 'axios';
import {getAccessToken, getRefreshToken, refreshAccessToken} from '../services/authService';
import {TruckOutlined} from '@ant-design/icons';

let navigateCallback = null;

export const setNavigateCallback = (callback) => {
	navigateCallback = callback;
};

// https://haddock-wise-mallard.ngrok-free.app/api
// https://alpaca-blessed-endlessly.ngrok-free.app/api
// http://localhost:5059/api
// 'ngrok-skip-browser-warning': 'true',

export const instance = axios.create({
	baseURL: 'http://localhost:5059/api',
	headers: {
		'ngrok-skip-browser-warning': 'true',
	},
});

instance.interceptors.request.use(
	async (config) => {
		let token = getAccessToken();

		if (!token) {
			// try {
			// 	const refreshToken = getRefreshToken();
			// 	if (!refreshToken) {
			// 		if (navigateCallback) {
			// 			navigateCallback('/login');
			// 		}
			// 		navigateCallback('/login');
			// 	}
			// 	token = await refreshAccessToken();
			// 	if (!token) {
			// 		if (navigateCallback) {
			// 			navigateCallback('/login');
			// 		}
			// 		navigateCallback('/login');
			// 	}
			// } catch (error) {
			// 	if (navigateCallback) {
			// 		navigateCallback('/login');
			// 	}
			// 	console.log('Error refreshing token:', error);
				
			// }
			navigateCallback('/login');
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

		// Check if error.response and error.response.headers exist
		if (
			error.response &&
			error.response.headers &&
			error.response.headers['is-exchangestuff-token-expired'] === 'true'
		) {
			originalRequest._retry = true;
			const oldAccessToken = getAccessToken();
			try {
				const refreshToken = getRefreshToken();
				if (!refreshToken) {
					if (navigateCallback) {
						navigateCallback('/login');
					}
					window.location.href = 'http://localhost:3000/login';
				}
				const res = await axios.post(
					'http://localhost:5059/api/Auth/renew',
					{
						refreshToken,
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
				} else {
					if (navigateCallback) {
						navigateCallback('/login');
					}
					window.location.href = 'http://localhost:3000/login';
				}
			} catch (err) {
				console.log('Error renewing token:', err);
				if (navigateCallback) {
					navigateCallback('/login');
				}
				window.location.href = 'http://localhost:3000/login';
			}
		}

		return Promise.reject(error);
	}
);

export default instance;
