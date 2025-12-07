import { readFileSync } from "fs";

function readInput() {
  return readFileSync("./input.txt", "utf-8")
    .split("\n")
    .map((line) => line.split(""));
}

// Part 1
function findSplits() {
  const input = readInput();

  // starting position
  let currPos = [`0,${input[0].findIndex((val) => val === "S")}`];

  // Track position of the splitters
  let splitPos: string[] = [];

  // go through all rows on map
  for (let i = 1; i < input.length - 1; i++) {
    const newPos: string[] = [];
    // go through each of our current positions
    currPos.forEach((pos) => {
      const x = Number(pos.split(",")[0]);
      const y = Number(pos.split(",")[1]);
      // if there is a splitter below us...
      if (input[x + 1][y] === "^") {
        // add it to the splitter positions
        if (!splitPos.includes(`${x + 1},${y}`)) {
          splitPos.push(`${x + 1},${y}`);
        }
        // add two new positions to check in our next loop
        if (!newPos.includes(`${x + 1},${y + 1}`)) {
          newPos.push(`${x + 1},${y + 1}`);
        }
        if (!newPos.includes(`${x + 1},${y - 1}`)) {
          newPos.push(`${x + 1},${y - 1}`);
        }
      } else {
        // if no splitter just continue down
        newPos.push(`${x + 1},${y}`);
      }
    });
    // set our new current positions
    currPos = newPos;
  }
  return splitPos.length;
}

// Part 2
function findTimelines() {
  const input = readInput();

  // start by placing a 1 right below the start
  const startCol = input[0].findIndex((val) => val === "S");
  input[1][startCol] = "1";

  // go through all of the rows and columns
  for (let i = 2; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      // if we are on a splitter...
      if (input[i][j] === "^") {
        // check if we have a number above us
        if (input[i - 1][j] !== "^" && input[i - 1][j] !== ".") {
          if (j + 1 < input[0].length) {
            // if right col empty, place the number
            if (input[i][j + 1] === ".") {
              input[i][j + 1] = input[i - 1][j];
            } else {
              // if number in right col, combine them
              input[i][j + 1] = `${
                Number(input[i][j + 1]) + Number(input[i - 1][j])
              }`;
            }
          }
          // do the same for the left side
          if (j - 1 >= 0) {
            if (input[i][j - 1] === ".") {
              input[i][j - 1] = input[i - 1][j];
            } else {
              input[i][j - 1] = `${
                Number(input[i][j - 1]) + Number(input[i - 1][j])
              }`;
            }
          }
        }
        // if we are on a empty position, just copy above value
      } else if (input[i][j] === ".") {
        if (input[i - 1][j] !== "^") {
          input[i][j] = input[i - 1][j];
        }
        // if we are on a number
      } else {
        if (input[i - 1][j] !== "^" && input[i - 1][j] !== ".") {
          // copy the number down if empty space
          if (input[i][j] === ".") {
            input[i][j] = input[i - 1][j];
          } else {
            // combine number with the one below
            input[i][j] = `${Number(input[i - 1][j]) + Number(input[i][j])}`;
          }
        }
      }
    }
  }

  // add all of the values in the final row
  return input[input.length - 1]
    .filter((val) => val !== ".")
    .map((val) => Number(val))
    .reduce((acc, val) => acc + val);
}

//console.log(findSplits());
console.log(findTimelines());
