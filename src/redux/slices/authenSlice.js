import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const loginByAdmin = createAsyncThunk(
	'/Account/users?pageIndex=1&pageSize=10',
	async ({body}, {rejectWithValue}) => {
		try {
			const url = `/Admin/login`;
			console.log('response', response);
			return response.data.metadata;
		} catch (error) {
			console.log('error', error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const authenSlice = createSlice({
	name: 'authenSlice',
	initialState: {
		financialList: [],
		loading: true,
		error: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.isLogin = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			//add case for fetch data function example
			.addCase(fetchFinancial.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchFinancial.fulfilled, (state, action) => {
				state.loading = false;
				state.financialList = action.payload;
			})
			.addCase(fetchFinancial.rejected, (state, action) => {
				state.loading = true;
				state.error = action.payload;
			});
	},
});
