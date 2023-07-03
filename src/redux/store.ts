import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import CodeType from "../model/CodeType";
import UserData from "../model/UserData";
import { authReducer } from "./slices/AuthSlice";
import { codeReducer } from "./slices/CodeSlice";
import { CodeState, RootState } from "./types";

export const store = configureStore({
  reducer: {
    authState: authReducer,
    codeState: codeReducer,
  },
});

export const useAuthSelector = (): UserData =>
  useSelector((state: RootState) => state.authState.user);
export const useCodeSelector = (): CodeState =>
  useSelector((state: RootState) => state.codeState);
