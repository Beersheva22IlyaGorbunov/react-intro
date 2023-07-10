import React from 'react'
import { matrixSum, range } from './utils/number-functions'

test('sum of matrix', () => {
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]
  expect(matrixSum(matrix)).toBe(45)
})

test('range test', () => {
  expect(range(1, 3)).toStrictEqual([1, 2])
})
