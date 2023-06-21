export default class LimeGameService {
  constructor(private _numbers: number[][]) {
  }

  get numbers() {
    return this._numbers;
  }

  next(): number[][] {
    this._numbers = this._numbers.map((_, row) => this._getUpdatedRow(row))
    return this._numbers;
  }

  private _getUpdatedRow(row: number): number[] {
    return this._numbers[row].map((_, col) => this._getUpdatedCell(row, col))
  }

  private _getUpdatedCell(row: number, col: number): number {
    let state = this._numbers[row][col];
    const liveNeighbours = this._getLiveNeighbours(row, col);
    if (state === 0) {
      if (liveNeighbours === 3) {
        state = 1
      }
    } else {
      if (liveNeighbours < 2 || liveNeighbours > 3) {
        state = 0
      }
    }
    return state;
  }

  private _getLiveNeighbours(row: number, col: number): number {
    let liveNeighbours = 0;
    if (this._numbers[row - 1] && this._numbers[row - 1][col] === 1) {
      liveNeighbours++;
    }
    if (this._numbers[row][col + 1] === 1) {
      liveNeighbours++;
    }
    if (this._numbers[row + 1] && this._numbers[row + 1][col] === 1) {
      liveNeighbours++;
    }
    if (this._numbers[row][col - 1] === 1) {
      liveNeighbours++;
    }
    return liveNeighbours;
  }

}