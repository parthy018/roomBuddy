import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Uses localStorage for web
import { apiSlice } from './appSlice';
import authSlice from './authSlice';

// Configuration for redux-persist
const persistConfig = {
  key: 'root', // The key for the persisted state
  storage, // Defines which type of storage to use (localStorage)
  whitelist: ['auth'], // Specify which state slices to persist
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedReducer, // Use the persisted reducer for the auth slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
});

// Create a persistor
export const persistor = persistStore(store);
