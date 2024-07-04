import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api, Headers} from '../../services/api';

export const fetchFinancial = createAsyncThunk(
	'Get All Financial Ticket',
	async ({pageIndex, pageSize, status}, {rejectWithValue}) => {
		try {
			const url = `/getAllFinancialTicket?pageIndex=${pageIndex}&pageSize=${pageSize}&status=${status}`;
			console.log('response');
			const response = await api.get(url, {
				headers: Headers,
			});
			console.log('response', response);
			return response.data;
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
				state.financialList = action.payload;
			})
			.addCase(fetchFinancial.rejected, (state, action) => {
				state.loading = true;
				state.error = action.payload;
			});
	},
});
