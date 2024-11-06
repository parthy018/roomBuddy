import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https:room-buddy-seven.vercel.app/api/auth";

export const apiSlice = createApi({
  reducerPath: 'api',
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
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    needRoommate: builder.mutation({
      query: (propertyData) => ({
        url: '/listing/need-roommate',
        method: 'POST',
        body: propertyData,
      }),
    }),
    needRoom:builder.mutation({
      query:(formData)=>({
        url:'/listing/need-room',
        method:'POST',
        body:formData,
      })
    }),
    getUser:builder.query({
      query:()=>({
        url:'/user',
        method:'GET'
      })
    })

  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useNeedRoommateMutation,
  useNeedRoomMutation,
  useGetUserQuery,
} = apiSlice;
