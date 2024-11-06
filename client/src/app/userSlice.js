// userSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:4000/api";

export const userSlice = createApi({
  reducerPath: 'user',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState, endpoint }) => {
      // Do not add token for 'getPropertiesByLocation'
      if (endpoint !== 'getPropertiesByLocation') {
        const token = getState().auth.token;
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
      }
      return headers;
    }
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getPropertiesByLocation: builder.query({
      query: (location) => ({
        url: `/properties/${location}`, 
        method: 'GET',
      }),
    }),

    getPropertyDetailById:builder.query({
      query:({location,id})=>({
        url:`/properties/${location}/${id}`,
        method:'GET',
      })
    }),
  
  
  })
});

export const {
  useGetPropertiesByLocationQuery,
  useGetPropertyDetailByIdQuery,

} = userSlice;
