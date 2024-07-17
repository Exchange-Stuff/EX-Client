import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../utils/axios';

export const getAllProductByAdmin = createAsyncThunk(
	'product/getAllProductByAdmin',
	async ({rejectWithValue}) => {
		try {
			const url = `/Product/getForAdmin`;
			const response = await api.get(url);
			console.log('response', response.data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getAllProductByModerator = createAsyncThunk(
	'product/getAllProductByModerator',
	async ({rejectWithValue}) => {
		try {
			const url = `/Product/getForModerator`;
			const response = await api.get(url);
			console.log('response', response.data);
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
