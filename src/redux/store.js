import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {userSlice} from './slices/userSlice';
import {financialSlice} from './slices/financialSlice';
import {productSlice} from './slices/productSlice';
import {authenSlice} from './slices/authenSlice';
import {dashboardSlice} from './slices/dashboardSlice';

const rootPersistConfig = {
	key: 'root',
	storage,
	safelist: ['userSlice'], // Add 'transactionSlice' to persist
};

const rootReducer = combineReducers({
	userSlice: userSlice.reducer,
	financialSlice: financialSlice.reducer,
	productSlice: productSlice.reducer,
	authenSlice: authenSlice.reducer,
	dashboardSlice: dashboardSlice.reducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);

export * from './selectors'; // Export selectors
