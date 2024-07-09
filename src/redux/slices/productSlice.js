import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api, Headers} from '../../services/api';

export const getAllProductByAdmin = createAsyncThunk(
	'Get All Financial Ticket By Admin',
	async ({rejectWithValue}) => {
		try {
			const url = `/Product/getForAdmin`;
			console.log('response');
			const response = await api.get(url);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getAllProductByModerator = createAsyncThunk(
	'Get All Financial Ticket By Moderator',
	async ({rejectWithValue}) => {
		try {
			const url = `/Product/getForModerator`;
			console.log('response');
			const response = await api.get(url);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const productSlice = createSlice({
	name: 'productSlice',
	initialState: {
		productList: [],
		loading: true,
		error: null,
		totalPage: 0,
	},
	reducers: {
		setUser: (state, action) => {
			state.financialInfo = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			//add case for fetch data function example
			.addCase(getAllProductByAdmin.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllProductByAdmin.fulfilled, (state, action) => {
				state.loading = false;
				state.productList = action.payload;
			})
			.addCase(getAllProductByAdmin.rejected, (state, action) => {
				state.loading = true;
				state.error = action.payload;
			});
	},
});
