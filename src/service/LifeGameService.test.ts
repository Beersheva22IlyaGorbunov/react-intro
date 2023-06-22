import LifeGameService from "./LifeGameService"

const matrix1Step0 = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
]

const matrix1Step1 = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0]
]

const matrix2Step0 = [
  [0, 0, 0, 0],
  [0, 1, 1, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0]
]

const service = new LifeGameService(matrix1Step0);
const service2 = new LifeGameService(matrix2Step0);

test("test initial state", () => {
  expect(service.numbers).toStrictEqual(matrix1Step0);
  expect(service2.numbers).toStrictEqual(matrix2Step0);
})

test("test matrix1 next step", () => {
  expect(service.next()).toStrictEqual(matrix1Step1);
  expect(service.next()).toStrictEqual(matrix1Step0);
})

test("test matrix2 next step", () => {
  expect(service2.next()).toStrictEqual(matrix2Step0);
  expect(service2.next()).toStrictEqual(matrix2Step0);
})
