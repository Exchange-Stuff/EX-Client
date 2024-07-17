//selectors.js

// authen
export const getErrorAuthenSelector = (state) => state.authenSlice.error;

// users
export const getAllUserSelector = (state) => state.userSlice.users;
export const getLoadingUserSelector = (state) => state.userSlice.loading;
export const getTotalPageSelector = (state) => state.userSlice.total_page;

// financial
export const getAllFinancialSelector = (state) => state.financialSlice.financialList;
export const getLoadingFinancialSelector = (state) => state.financialSlice.loading;
export const getTotalPageFinancialSelector = (state) => state.financialSlice.totalPage;

// products admin
export const getAllProductSelector = (state) => state.productSlice.productList;
