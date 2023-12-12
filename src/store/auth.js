import { createSlice } from "@reduxjs/toolkit";

const initialState = { islogin: !!localStorage.getItem("token") };

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    login(state) {
      state.islogin = true;
    },
    logout(state) {
      state.islogin = false;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
