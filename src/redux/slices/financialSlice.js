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

export const financialSlice = createSlice({
	name: 'financialSlice',
	initialState: {
		financialList: [],
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
			});
	},
});
