import { matrixSum } from "../utils/number-functions";

export default class LimeGameService {
  constructor(private _numbers: number[][]) {
  }

  get numbers() {
    return this._numbers;
  }

  next(): number[][] {
    this._numbers = this._numbers.map((_, row) => this._getUpdatedRow(row));
    return this._numbers;
  }

  private _getUpdatedRow(index: number): number[] {
    return this._numbers[index].map((_, col) => this._getUpdatedCell(index, col));
  }

  private _getUpdatedCell(row: number, col: number): number {
    const cell = this._numbers[row][col];
    const partialMatrix = this.partialMatrix(row, col);
    const sum = matrixSum(partialMatrix) - cell;
    return cell ? getCellFromLive(sum) : getCellFromDead(sum);
  }

  private partialMatrix(row: number, col: number): number[][] {
    const indexStart = !col ? 0 : col - 1;
    const indexEnd = col === this._numbers[0].length - 1 ? col + 1 : col + 2;
    return [row - 1, row, row + 1].map(i => this._numbers[i] 
      ? this._numbers[i].slice(indexStart, indexEnd)
      : [0]);
  }
}

function getCellFromLive(sum: number): number {
  return +(sum >= 2 && sum <=3);
}

function getCellFromDead(sum: number): number {
  return +(sum === 3);
}