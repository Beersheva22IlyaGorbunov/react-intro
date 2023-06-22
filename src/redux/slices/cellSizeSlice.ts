import { createSlice } from "@reduxjs/toolkit";
import lifeConfig from '../../config/life-game-config.json' 
import { CellSizeState } from "../types";

const { dimension, matrixSizePercent } = lifeConfig

function calcCellSize(): number {
  return Math.min(window.innerHeight, window.innerWidth) / dimension * (matrixSizePercent / 100);
}

const initialState: CellSizeState = {
  size: calcCellSize()
}

const slice = createSlice({
  initialState: initialState,
  name: 'cellSizeState',
  reducers: {
    updateCellSize: (state) => {
      state.size = calcCellSize();
    }
  }
})

export const { updateCellSize } = slice.actions;
export const cellSizeReducer = slice.reducer;
