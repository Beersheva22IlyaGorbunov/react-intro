import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { cellSizeReducer } from "./slices/cellSizeSlice";
import { directionReducer } from "./slices/flexDirectionSlice";
import { lifeCountReducer } from "./slices/lifesCountSlice";
import { FlexDirection, RootState } from "./types";

export const store = configureStore({
  reducer: {
    flexDirectionState: directionReducer,
    lifeCountState: lifeCountReducer,
    cellSizeState: cellSizeReducer
  }
})

export const useSelectorDirection = () => 
  useSelector<RootState, FlexDirection>((state: RootState) => state.flexDirectionState.direction)

export const useSelectorLifes = () => 
  useSelector<RootState, number>((state: RootState) => state.lifeCountState.lifeCount)

export const useSelectorCellSize = () => 
  useSelector<RootState, number>((state: RootState) => state.cellSizeState.size)
