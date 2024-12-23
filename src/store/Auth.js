import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}

const Auth = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        login: (state, action) => {

            state.user = action.payload
        },
        logout: state => {

            state.user = null;
        }
    }
})

export const { login, logout } = Auth.actions
export default Auth.reducer