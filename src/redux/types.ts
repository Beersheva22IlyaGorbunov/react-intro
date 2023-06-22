export type CellSizeState = {
  size: number
}

export type FlexDirectionState = {
  direction: 'row' | 'column'
}

export type FlexDirection = 'row' | 'column'

export type LifeCountState = {
  lifeCount: number
}

export type RootState = {
  cellSizeState: CellSizeState,
  flexDirectionState: FlexDirectionState,
  lifeCountState: LifeCountState
}