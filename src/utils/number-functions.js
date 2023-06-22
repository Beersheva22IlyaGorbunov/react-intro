export function range(min, max) {
  return Array.from({length: max - min}).map((__, index) => index + min);
}

export function arraySum(array) {
  return array.reduce((accum, elem) => accum + elem, 0);
}

export function matrixSum(matrix) {
  return matrix.reduce((accum, arr) => accum + arraySum(arr), 0);
}
