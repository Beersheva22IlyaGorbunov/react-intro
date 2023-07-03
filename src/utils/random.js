export function getRandomInt(min, max) {
  return Math.trunc(Math.random() * (max - min) + min);
}

export function getRandomIntMatrix(rows, cols, min, max) {
  return Array.from({length: rows}).map(() => getRandomIntArray(cols, min, max));
}

export function getRandomIntArray(length, min, max) {
  return Array.from({length}).map(() => getRandomInt(min, max))
}

export function getRandomElement(arr) {
  return arr[getRandomInt(0, arr.length)];
}

export function getRandomEmployee({
  departments,
  minSalary,
  maxSalary,
  minYear,
  maxYear,
  salaryStep
}) {
  const minBirthYear = minYear;
  const maxBirthYear = maxYear;
  const gender = getRandomGender();
  return {
    name: gender === "male" ? getRandomMaleName() : getRandomFemaleName(),
    birthDate: new Date(getRandomInt(minBirthYear, maxBirthYear + 1), getRandomInt(0, 12), getRandomInt(0, 32)),
    gender: gender,
    salary: getRandomInt(minSalary / salaryStep, maxSalary / salaryStep) * salaryStep,
    department: getRandomElement(departments),
  };
}

export function getRandomMaleName() {
  return getRandomElement([
    "James",
    "John",
    "William",
    "Michael",
    "David",
    "Daniel",
    "Robert",
    "Joseph",
    "Christopher",
    "Matthew",
  ]);
}

export function getRandomFemaleName() {
  return getRandomElement([
    "Mary",
    "Jennifer",
    "Linda",
    "Susan",
    "Sarah",
    "Karen",
    "Emily",
    "Jessica",
    "Elizabeth",
    "Michelle",
  ]);
}

export function getRandomGender() {
  return getRandomElement(["male", "female"]);
}
