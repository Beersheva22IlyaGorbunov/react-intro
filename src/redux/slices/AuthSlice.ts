import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserData from "../../model/UserData";
import { AuthState } from "../types";

const AUTH_ITEM_STORAGE = "auth";

function getAuthFromSession(): UserData {
  const fromlocalStorage = window.localStorage.getItem(AUTH_ITEM_STORAGE);
  return fromlocalStorage ? JSON.parse(fromlocalStorage) : null;
}

const initialState: AuthState = {
  user: getAuthFromSession()
}

const slice = createSlice({
  initialState: initialState,
  name: 'authState',
  reducers: {
    signIn: (state, { payload }: PayloadAction<UserData>) => {
      state.user = payload;
      if (payload) {
        window.localStorage.setItem(AUTH_ITEM_STORAGE, JSON.stringify(payload));
      }
    }, 
    signOut: (state) => {
      state.user = null;
      window.localStorage.removeItem(AUTH_ITEM_STORAGE);
    }
  }
})

export const { signIn, signOut } = slice.actions;
export const authReducer = slice.reducer;
