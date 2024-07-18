import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../utils/axios';
// import {api} from '../../services/api';

export const fetchUsers = createAsyncThunk(
	'Get List User',
	async ({name, username, email, pageIndex, pageSize, includeBan}, {rejectWithValue}) => {
		try {
			const url = `/Account/users?page_size=$name=${name}&username=${username}&emai=${email}&pageIndex=${pageIndex}&pageSize=${pageSize}&includeBan=${includeBan} `;
			const response = await api.get(url);
			console.log('response', response);
			return response.data.value;
		} catch (error) {
			console.log('Error', error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getListusersBan = createAsyncThunk(
	'Get List User Ban',
	async ({userId, reasonId, reason, pageIndex, pageSize}, {rejectWithValue}) => {
		try {
			const url = `/UserBan/userBanReports?userId=${userId}&reasonId=${reasonId}&reason=${reason}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
			const response = await api.get(url);
			console.log('response', response);
			return response.data.value;
		} catch (error) {
			console.log('Error', error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateUserBan = createAsyncThunk(
	'Update User Ban',
	async ({id}, {rejectWithValue}) => {
		try {
			const url = `/UserBan`;
			const response = await api.put(url, {
				id: id,
			});
			console.log('response', response);
			return response.data.value;
		} catch (error) {
			console.log('Error', error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const userSlice = createSlice({
	name: 'userSlice',
	initialState: {
		users: [],
		loading: false,
		error: null,
		total_page_user: 0,
		listUserBan: [],
		total_page_user_ban: 0,
	},
	reducers: {
		setUser: (state, action) => {
			state.userInfo = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			//add case for fetch data function example
			.addCase(fetchUsers.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.users = action.payload.listItem;
				state.total_page_user = action.payload.totalPage;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			// get list user ban
			.addCase(getListusersBan.pending, (state) => {
				state.loading = true;
			})
			.addCase(getListusersBan.fulfilled, (state, action) => {
				state.loading = false;
				state.listUserBan = action.payload;
				state.total_page_user_ban = action.payload.totalPage;
			})
			.addCase(getListusersBan.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
