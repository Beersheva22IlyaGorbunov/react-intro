import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import UserData from "../model/UserData";
import { authReducer } from "./slices/AuthSlice";
import { RootState } from "./types";

export const store = configureStore({
  reducer: {
    authState: authReducer
  }
})

export const useAuthSelector = (): UserData => useSelector((state: RootState) => state.authState.user)
