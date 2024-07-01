import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const fetchUsers = createAsyncThunk(
	'/Account/users?pageIndex=1&pageSize=10',
	async ({name, username, email, pageIndex, pageSize, includeBan}, {rejectWithValue}) => {
		try {
			const url = `/Account/users?page_size=$name=${name}&username=${username}&emai=${email}&pageIndex=${pageIndex}&pageSize=${pageSize}&includeBan=${includeBan} `;
			const response = await api.get(url);
			console.log('response', response);
			return response.data.value;
		} catch (error) {
			console.log('error', error);
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
		total_page: 0,
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
				state.total_page = action.payload.totalPages;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});
