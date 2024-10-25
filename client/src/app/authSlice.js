import { createSlice } from "@reduxjs/toolkit";

const initialState={
    name:null,
    token:null,
    isAuthenticated:false,
    role:null,
    isListed:false,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials: (state, action) => {
            const { name, token, role, isListed } = action.payload.data;
            state.token = token;
            state.role = role;
            state.user = name;
            state.isListed = isListed;
            state.isAuthenticated = true;
          },
          logOut: (state) => {
            state.token = null;
            state.role = null;
            state.user = null;
            state.isListed = false;
            state.isAuthenticated = false;
          },
    }
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;