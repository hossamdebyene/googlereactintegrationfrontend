import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "login",
  initialState: {
    userData: "",
    isLoggedIn: false,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userData = action.payload.userData;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userData = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions;
