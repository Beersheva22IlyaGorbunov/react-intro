import { createSlice } from "@reduxjs/toolkit";
import { FlexDirection, FlexDirectionState } from "../types";

const initialState: FlexDirectionState = {
  direction: getDirection()
}

function getDirection(): FlexDirection {
  return window.innerHeight > window.innerWidth ? 'column' : 'row'
}

const slice = createSlice({
  initialState: initialState,
  name: 'directionState',
  reducers: {
    updateDirection: (state) => {
      state.direction = getDirection();
    }
  }
})

export const { updateDirection } = slice.actions;
export const directionReducer = slice.reducer;
