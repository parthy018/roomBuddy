import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL

const baseUrl = "https://roombuddy.onrender.com/api/auth";
// const baseUrl = "http://localhost:4000/api/auth";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
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
    verifyOTP: builder.mutation({
      query: (otpData) => ({
        url: "/verifyOTP",
        method: "POST",
        body: otpData,
      }),
    }),

    needRoommate: builder.mutation({
      query: (propertyData) => ({
        url: "/listing/need-roommate",
        method: "POST",
        body: propertyData,
      }),
    }),
    needRoom: builder.mutation({
      query: (formData) => ({
        url: "/listing/need-room",
        method: "POST",
        body: formData,
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    editUser: builder.mutation({
      query: (editUserData) => ({
        url: "/user/editprofile",
        method: "PUT",
        body: editUserData,
      }),
    }),
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/user/changeuserpassword",
        method: "POST",
        body: passwordData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOTPMutation,
  useNeedRoommateMutation,
  useNeedRoomMutation,
  useGetUserQuery,
  useEditUserMutation,
  useChangePasswordMutation,
} = apiSlice;
