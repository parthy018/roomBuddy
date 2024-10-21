import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl="http://localhost:4000"

export const apiSlice=createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({
        baseUrl:baseUrl,
        prepareHeaders:(headers,{getState})=>{
            const token=getState().auth.token;
            if(token){
                headers.set('authorization',`Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(credentials)=>({
                url:"/login",
                method:"POST",
                body:credentials
            })
        }),
        register:builder.mutation({
            query:(userData)=>({
                url:"/register",
                method:"POST",
                body:userData
            })
        }),
        createProperty: builder.mutation({
            query: (propertyData) => ({
              url: '/property/create',
              method: 'POST',
              body: propertyData,
            }),
          }),
          getAllProperties: builder.query({
            query: () => '/property/all',
          }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useCreatePropertyMutation,
    useGetAllPropertiesQuery,
  } = apiSlice;
