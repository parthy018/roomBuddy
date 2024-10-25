// app/store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import { apiSlice } from './appSlice';
import authReducer from './authSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Ensure only the auth slice is persisted
};

// Combine the root reducer with persisted reducer for auth
const rootReducer =combineReducers( {
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
