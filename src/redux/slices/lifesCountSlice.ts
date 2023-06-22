import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LifeCountState } from "../types";

const initialState: LifeCountState = {
  lifeCount: 1
}

const slice = createSlice({
  initialState: initialState,
  name: 'lifeCountState',
  reducers: {
    setCount: (state, { payload }: PayloadAction<number>) => {
      state.lifeCount = payload;
    }
  }
})

export const { setCount } = slice.actions;
export const lifeCountReducer = slice.reducer;
