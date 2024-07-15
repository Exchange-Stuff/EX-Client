import axios from 'axios';

export const apiURL = `http://localhost:5059/api`;

export const api = axios.create({
	baseURL: apiURL,
	headers: {
		accessToken: `${localStorage.getItem('accessToken')}`,
		refreshToken: `${localStorage.getItem('refreshToken')}`,
		'ngrok-skip-browser-warning': 'true',
		Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
	},
});
