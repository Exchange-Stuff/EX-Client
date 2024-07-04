import axios from 'axios';

export const apiURL = `https://haddock-wise-mallard.ngrok-free.app/api`;

export const Headers = {
	refreshToken: localStorage.getItem('refreshToken'),
	accessToken: localStorage.getItem('accessToken'),
	'ngrok-skip-browser-warning': 'true',
};

export const api = axios.create({
	baseURL: apiURL,
	headers: {
		accessToken: `${localStorage.getItem('accessToken')}`,
		'ngrok-skip-browser-warning': 'true',
	},
});
