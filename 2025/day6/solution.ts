import { readFileSync } from "fs";

function readInput() {
  const input = readFileSync("./input.txt", "utf-8").split("\n");

  // values is the 2d array of numbers, ops is the last row of operators for each col
  return {
    values: input.slice(0, input.length - 1).map((row) =>
      row
        .split(" ")
        .filter((ch) => ch !== "")
        .map((ch) => Number(ch))
    ),
    ops: input[input.length - 1].split(" ").filter((ch) => ch !== ""),
  };
}

function doMath() {
  const input = readInput();

  // starting values in the first row
  const currNums = input.values[0];

  // go through each row...
  for (let i = 1; i < input.values.length; i++) {
    const currRow = input.values[i];
    // apply the corresponding operator to each value in the row
    currRow.forEach((num, idx) => {
      if (input.ops[idx] === "+") {
        currNums[idx] += num;
      } else {
        currNums[idx] *= num;
      }
    });
  }

  // sum all of the final numbers together
  return currNums.reduce((acc, val) => acc + val);
}

// read the input in "sideways"
function readInput2() {
  const input = readFileSync("./input.txt", "utf-8")
    .split("\n")
    .map((line) => line.split(""));

  const parsedNums: number[][] = [];

  let currNumSet: number[] = [];
  for (let j = 0; j < input[0].length; j++) {
    const currNum: string[] = [];
    // get all of the numbers in the col
    for (let i = 0; i < input.length - 1; i++) {
      currNum.push(input[i][j]);
    }

    // once we get a col of all spaces, done parsing the number set
    if (currNum.every((chr) => chr === " ")) {
      parsedNums.push(currNumSet);
      currNumSet = [];
    } else {
      // filter out all of the empty spaces
      const numStr = currNum.filter((ch) => ch !== " ").join("");
      currNumSet.push(Number(numStr));
    }
  }

  parsedNums.push(currNumSet);

  return {
    values: parsedNums,
    ops: input[input.length - 1].filter((ch) => ch !== " "),
  };
}

function doMath2() {
  const input = readInput2();

  let total = 0;
  for (let i = 0; i < input.values.length; i++) {
    let colTotal = 0;
    for (let j = 0; j < input.values[i].length; j++) {
      if (input.ops[i] === "+") {
        colTotal += input.values[i][j];
      } else {
        // fix mult by 0 issue
        if (colTotal === 0) colTotal += 1;
        colTotal *= input.values[i][j];
      }
    }

    total += colTotal;
  }

  return total;
}

console.log(doMath());
console.log(doMath2());
