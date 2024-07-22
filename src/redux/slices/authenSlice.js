import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// import api from '../../utils/axios';
import {api} from '../../services/api';
import axios from '../../utils/axios';

export const loginByAdmin = createAsyncThunk(
	'Login by admin',
	async ({username, password}, {rejectWithValue}) => {
		try {
			console.log('username', username);
			console.log('password ', password);
			const url = `/Admin/login`;
			const response = await api.post(url, {username, password});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const loginByModerator = createAsyncThunk(
	'Login by moderator',
	async ({username, password}, {rejectWithValue}) => {
		try {
			const url = `/Auth/signin`;
			const response = await api.post(url, {username, password});
			console.log(`response`, response);
			return response.data;
		} catch (error) {
			console.log(`error`, error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getResourceAuthor = createAsyncThunk(
	'Get resource author',
	async ({resource}, {rejectWithValue}) => {
		try {
			const url = `/Auth/screen`;
			console.log(`resource`, resource);
			const response = await axios.post(url, {
				resource: resource,
			});
			return response.data.isSuccess;
		} catch (error) {
			console.log(`error`, error.response.data);
			return rejectWithValue(error.response.data);
		}
	}
);

export const authenSlice = createSlice({
	name: 'authenSlice',
	initialState: {
		user: {},
		loading: true,
		error: null,
		isAuthor: false,
		resourceLoading: true,
	},
	reducers: {
		setUser: (state, action) => {
			state.isLogin = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// Case for login by admin
			.addCase(loginByAdmin.pending, (state) => {
				state.loading = true;
			})
			.addCase(loginByAdmin.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(loginByAdmin.rejected, (state, action) => {
				state.loading = true;
				state.error = action.payload;
			})
			// Case for login by moderator
			.addCase(loginByModerator.pending, (state) => {
				state.loading = true;
			})
			.addCase(loginByModerator.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
			})
			.addCase(loginByModerator.rejected, (state, action) => {
				state.loading = true;
				state.error = action.payload;
			})
			// case author screen
			.addCase(getResourceAuthor.fulfilled, (state, action) => {
				state.resourceLoading = false;
			})
			.addCase(getResourceAuthor.rejected, (state, action) => {
				state.resourceLoading = true;
			});
	},
});
