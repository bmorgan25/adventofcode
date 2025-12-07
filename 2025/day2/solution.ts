import { readFileSync } from "fs";

function readInput() {
  return readFileSync("./input.txt", "utf-8").split(",");
}

/** PART ONE */

function isRepeating(num: string) {
  const regex = /^(\d+)\1$/;
  return regex.test(num);
}

function findRepeatDigits() {
  const input = readInput();

  let invalidIds = 0;
  input.forEach((range) => {
    let lower = Number(range.split("-")[0]);
    let upper = Number(range.split("-")[1]);

    while (lower <= upper) {
      isRepeating(String(lower)) ? (invalidIds += lower) : (invalidIds += 0);
      lower += 1;
    }
  });

  return invalidIds;
}

/** PART TWO */

function isRepeating2(num: string) {
  const regex = /^(\d+)\1+$/;
  return regex.test(num);
}

function findRepeatDigits2() {
  const input = readInput();

  let invalidIds = 0;
  input.forEach((range) => {
    let lower = Number(range.split("-")[0]);
    let upper = Number(range.split("-")[1]);

    while (lower <= upper) {
      isRepeating2(String(lower)) ? (invalidIds += lower) : (invalidIds += 0);
      lower += 1;
    }
  });

  return invalidIds;
}

//console.log(findRepeatDigits());

console.log(findRepeatDigits2());
