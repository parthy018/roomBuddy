// store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './appSlice';
import authSlice from './authSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
