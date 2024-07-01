//selectors.js

// users
export const getAllUserSelector = (state) => state.userSlice.users;
export const getLoadingUserSelector = (state) => state.userSlice.loading;
export const getTotalPageSelector = (state) => state.userSlice.total_page;

// financial
export const getAllFinancialSelector = (state) => state.financialSlice.financialList;
export const getLoadingFinancialSelector = (state) => state.financialSlice.loading;
