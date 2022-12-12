import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../feature/login/login.slice";

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
