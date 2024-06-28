import axios from 'axios';

export const apiURL = `http://localhost:5059/api`;

export const Headers = {
	refreshToken: localStorage.getItem('refreshToken'),
	accessToken: localStorage.getItem('accessToken'),
};

export const api = axios.create({
	baseURL: apiURL,
	headers: {
		accessToken: `${localStorage.getItem('accessToken')}`,
	},
});
