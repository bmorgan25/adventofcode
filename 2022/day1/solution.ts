import * as fs from "fs";

/**
returns like this
[
  '1000', '2000',  '3000',
  '',     '4000',  '',
  '5000', '6000',  '',
  '7000', '8000',  '9000',
  '',     '10000'
]
 */
function readFile() {
  // concat new line for last element
  return fs.readFileSync("./input1.txt", "utf-8").concat("\n").split("\n");
}

// part 1
function findCalories() {
  let totalCals: number[] = [];
  let currentTotal = 0;
  readFile().forEach((cal) => {
    if (cal) {
      currentTotal += Number(cal);
    } else {
      totalCals.push(currentTotal);
      currentTotal = 0;
    }
  });
  return Math.max(...totalCals);
}

// part 2
function findTop3Elves() {
  // same as above function
  let totalCals: number[] = [];
  let currentTotal = 0;
  readFile().forEach((cal) => {
    if (cal) {
      currentTotal += Number(cal);
    } else {
      totalCals.push(currentTotal);
      currentTotal = 0;
    }
  });
  // sort in descending order and add up the first three elements
  return totalCals
    .sort((a, b) => (a > b ? -1 : a < b ? 1 : 0))
    .slice(0, 3)
    .reduce((acc, curr) => acc + curr, 0);
}

// console.log(findCalories());
console.log(findTop3Elves());
