import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    auth: false,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        login: (state, action) => {

            state.auth = action.payload;
        },

        logout: (state) => {
            state.auth = false;
        },

    }

});


export const {login, logout } = appSlice.actions;
export default appSlice.reducer;
