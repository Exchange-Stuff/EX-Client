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
export const getLoadingProductSelector = (state) => state.productSlice.loading;

// User bane
export const getListUserBanSelector = (state) => state.userSlice.listUserBan;
export const getLoadingUserBanSelector = (state) => state.userSlice.loading;
export const getTotalPageUserBanSelector = (state) => state.userSlice.total_page_user_ban;

// Product ban
export const getProductBanListSelector = (state) => state.productSlice.productBanList;
export const getLoadingProductBanSelector = (state) => state.productSlice.productBanLoading;
export const getTotalPageProductBanSelector = (state) => state.productSlice.totalPageBan;

// Author resource
export const getResourceLoading = (state) => state.authenSlice.resourceLoading;
