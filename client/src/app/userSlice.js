import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:4000/api/auth";

export const userSlice= createApi({
    reducerPath: 'user',
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
              headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
          }
    }),
    tagTypes: ['User'],
    endpoints:(builder) => ({
        
    })
});

