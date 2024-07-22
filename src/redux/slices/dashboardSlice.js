import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../../utils/axios';

export const getReportPurchase = createAsyncThunk(
	'Get report purchase',
	async (_, {rejectWithValue}) => {
		try {
			const url = `/Dashboard/get-report-purchase`;
			const response = await api.get(url);
			console.log('response', response);
			return response.data.value;
		} catch (error) {
			console.log('error', error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getDashboardListPurchase = createAsyncThunk(
	'Get Dashboard List Purchase',
	async (_, {rejectWithValue}) => {
		try {
			const url = `/Dashboard/get-list-purchase-in-week`;
			const response = await api.get(url);
			console.log('response', response);
			return response.data.value;
		} catch (error) {
			console.log('error', error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const dashboardSlice = createSlice({
	name: 'dashboardSlice',
	initialState: {
		reportDashboard: {
			totalTicket: 0,
			percentTotalWithLastWeek: 0,
			totalConfirmed: 0,
			percentConfirmedWithLastWeek: 0,
			totalCancelled: 0,
			percentCancelledWithLastWeek: 0,
		},
		listDashboard: [],
		loading: true,
		loadingList: true,
	},
	reducers: {
		setUser: (state, action) => {
			state.financialInfo = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			//add case for fetch data function example
			.addCase(getReportPurchase.pending, (state) => {
				state.loading = true;
			})
			.addCase(getReportPurchase.fulfilled, (state, action) => {
				state.loading = false;
				state.reportDashboard = action.payload;
			})
			.addCase(getReportPurchase.rejected, (state, action) => {
				state.loading = true;
				state.error = action.payload;
			})
			// case get list purchase in week
			.addCase(getDashboardListPurchase.pending, (state) => {
				state.loadingList = true;
			})
			.addCase(getDashboardListPurchase.fulfilled, (state, action) => {
				state.loadingList = false;
				state.listDashboard = action.payload;
			})
			.addCase(getDashboardListPurchase.rejected, (state, action) => {
				state.loadingList = true;
				state.error = action.payload;
			});
	},
});
