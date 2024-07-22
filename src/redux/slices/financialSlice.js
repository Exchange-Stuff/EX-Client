import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../utils/axios';

export const fetchFinancial = createAsyncThunk(
	'Get All Financial Ticket',
	async ({pageIndex, pageSize, status}, {rejectWithValue}) => {
		try {
			console.log('pageIndex', pageIndex);
			const url = `/FinancialTicket/getAllFinancialTicket?pageIndex=${pageIndex}&pageSize=${pageSize}&status=${status}`;
			const response = await api.get(url);
			console.log('response', response);
			return response.data.value;
		} catch (error) {
			console.log('error', error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateFinancial = createAsyncThunk(
	'Update Financial Ticket',
	async ({id}, {rejectWithValue}) => {
		try {
			console.log('id', id);
			const url = `/FinancialTicket/UpdateFinancialTicket`;
			const response = await api.put(url, {
				id: id,
				status: 1,
			});
			console.log('response', response.data);
			return response.data;
		} catch (error) {
			console.log('error', error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getDashboardPurchase = createAsyncThunk(
	'Get Dashboard Purchase',
	async (_, {rejectWithValue}) => {
		try {
			const url = `/Dashboard/get-list-purchase-in-week`;
			const response = await api.get(url);
			console.log('response', response);
			return response.data.value;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const financialSlice = createSlice({
	name: 'financialSlice',
	initialState: {
		financialList: [],
		loading: true,
		error: null,
		totalPage: 0,
		dashboard: {},
		loadingDashboard: true,
	},
	reducers: {
		setUser: (state, action) => {
			state.financialInfo = action.payload;
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
				state.financialList = action.payload.listItem;
				state.totalPage = action.payload.totalPage;
			})
			.addCase(fetchFinancial.rejected, (state, action) => {
				state.loading = true;
				state.error = action.payload;
			})
			//update financial
			.addCase(updateFinancial.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateFinancial.fulfilled, (state, action) => {
				state.loading = false;
			})
			.addCase(updateFinancial.rejected, (state, action) => {
				state.loading = true;
				state.error = action.payload;
			})
			// get dashboard purchase
			.addCase(getDashboardPurchase.pending, (state) => {
				state.loading = true;
			})
			.addCase(getDashboardPurchase.fulfilled, (state, action) => {
				state.loading = false;
				state.dashboardPurchase = action.payload;
			})
			.addCase(getDashboardPurchase.rejected, (state, action) => {
				state.loading = true;
				state.error = action.payload;
			});
	},
});
