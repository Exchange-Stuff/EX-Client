import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const fetchFinancial = createAsyncThunk(
	'/Account/users?pageIndex=1&pageSize=10',
	async ({pageIndex, pageSize, status}, {rejectWithValue}) => {
		try {
			console.log('pageIndex', pageIndex);
			const url = `/getAllFinancialTicket?pageIndex=${pageIndex}&pageSize=${pageSize}&status=${status}`;
			const response = await api.get(url);
			console.log('response', response);
			return response.data.metadata;
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
