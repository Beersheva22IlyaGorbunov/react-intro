import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthRoles, AuthState } from "../types";

const initialState: AuthState = {
  auth: null
}

const slice = createSlice({
  initialState: initialState,
  name: 'authState',
  reducers: {
    signIn: (state, { payload }: PayloadAction<AuthRoles>) => {
      state.auth = payload;
    }, 
    signOut: (state) => {
      state.auth = null;
    }
  }
})

export const { signIn, signOut } = slice.actions;
export const authReducer = slice.reducer;
