import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthRole, AuthState, isRole } from "../types";

const AUTH_ITEM_STORAGE = "auth";

function getAuthFromSession(): AuthRole {
  const fromSessionStorage = window.sessionStorage.getItem(AUTH_ITEM_STORAGE);
  return isRole(fromSessionStorage) ? fromSessionStorage : null;
}

function setAuthToSession(auth: AuthRole): void {
  if (auth) {
    window.sessionStorage.setItem(AUTH_ITEM_STORAGE, auth);
  } else {
    window.sessionStorage.removeItem(AUTH_ITEM_STORAGE);
  }
}

const initialState: AuthState = {
  role: getAuthFromSession()
}

const slice = createSlice({
  initialState: initialState,
  name: 'authState',
  reducers: {
    signIn: (state, { payload }: PayloadAction<AuthRole>) => {
      state.role = payload;
      setAuthToSession(payload);
    }, 
    signOut: (state) => {
      state.role = null;
      setAuthToSession(null);
    }
  }
})

export const { signIn, signOut } = slice.actions;
export const authReducer = slice.reducer;
