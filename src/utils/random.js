export function getRandomInt(min, max) {
  return Math.trunc(Math.random() * (max - min) + min);
}

export function getRandomIntMatrix(rows, cols, min, max) {
  return Array.from({length: rows}).map(() => getRandomIntArray(cols, min, max));
}

export function getRandomIntArray(length, min, max) {
  return Array.from({length}).map(() => getRandomInt(min, max))
}
