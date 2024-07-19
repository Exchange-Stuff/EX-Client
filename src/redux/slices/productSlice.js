import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../utils/axios';

export const getAllProductByAdmin = createAsyncThunk(
	'product/getAllProductByAdmin',
	async (_, {rejectWithValue}) => {
		try {
			const url = `/Product/getForAdmin`;
			const response = await api.get(url);
			console.log('response', response);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getAllProductByModerator = createAsyncThunk(
	'product/getAllProductByModerator',
	async (_, {rejectWithValue}) => {
		try {
			const url = `/Product/getForModerator`;
			const response = await api.get(url);
			console.log('response', response);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const getProductBanList = createAsyncThunk(
	'product/getProductBanList',
	async ({productId, reasonId, reason, pageIndex, pageSize}, {rejectWithValue}) => {
		try {
			const url = `/ProductBanReport/productBanReports?productId=${productId}&reasonId=${reasonId}&reason=${reason}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
			const response = await api.get(url);
			console.log('response', response.data);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateProductBan = createAsyncThunk(
	'product/updateProductBan',
	async ({id}, {rejectWithValue}) => {
		try {
			const url = `/ProductBanReport`;
			const response = await api.put(url, {
				id: id,
			});
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
		productBanList: [],
		totalPageBan: 0,
		productBanLoading: true,
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
			})
			// getAllProductByModerator
			.addCase(getAllProductByModerator.pending, (state) => {
				state.loading = true;
			})
			.addCase(getAllProductByModerator.fulfilled, (state, action) => {
				state.loading = false;
				state.productList = action.payload;
			})
			.addCase(getAllProductByModerator.rejected, (state, action) => {
				state.loading = true;
				state.error = action.payload;
			})
			// Product Ban List
			.addCase(getProductBanList.pending, (state) => {
				state.productBanLoading = true;
			})
			.addCase(getProductBanList.fulfilled, (state, action) => {
				state.productBanLoading = false;
				state.productBanList = action.payload;
				state.totalPageBan = action.payload.totalPage;
			})
			.addCase(getProductBanList.rejected, (state, action) => {
				state.productBanLoading = true;
				state.error = action.payload;
			})
			// update Product Ban
			.addCase(updateProductBan.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateProductBan.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(updateProductBan.rejected, (state, action) => {
				state.loading = true;
				state.error = action.payload;
			});
	},
});
