import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { authReducer } from "./slices/AuthSlice";
import { AuthRole, RootState } from "./types";

export const store = configureStore({
  reducer: {
    authState: authReducer
  }
})

export const useAuthSelector = (): AuthRole => useSelector((state: RootState) => state.authState.role)
