import { readFileSync } from "fs";

function readInput() {
  return readFileSync("./input.txt", "utf-8")
    .split("\n")
    .map((line) => line.split(""));
}

// the possible directions we can go
const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

// recursive function to traverse the trail
function findTrails(
  input: string[][],
  i: number,
  j: number,
  total: number,
  visted: string[]
) {
  // keep track of positions we've visted
  visted.push(`${i},${j}`);

  // base case
  if (input[i][j] === "9") {
    return total + 1;
  }

  // see if we can go any direction
  directions.forEach((dir) => {
    // try-catch to stop us going out of bounds
    try {
      const val = Number(input[i + dir[0]][j + dir[1]]);
      if (
        val - Number(input[i][j]) === 1 &&
        !visted.includes(`${i + dir[0]},${j + dir[1]}`)
      ) {
        // if we can go a direction, take it
        total = findTrails(input, i + dir[0], j + dir[1], total, visted);
      }
    } catch (err) {}
  });

  return total;
}

function part1() {
  const input = readInput();

  // go through the map
  return input.reduce((acc, row, i) => {
    return (
      acc +
      row.reduce((acc2, val, j) => {
        // if we hit a "0" check the paths we can take
        if (val === "0") {
          return acc2 + findTrails(input, i, j, 0, []);
        }
        return acc2;
      }, 0)
    );
  }, 0);
}

// same as above but we dont track visited paths
function findTrailRating(
  input: string[][],
  i: number,
  j: number,
  currRating: number
) {
  if (input[i][j] === "9") {
    return currRating + 1;
  }

  directions.forEach((dir) => {
    try {
      const val = Number(input[i + dir[0]][j + dir[1]]);
      if (val - Number(input[i][j]) === 1) {
        currRating = findTrailRating(input, i + dir[0], j + dir[1], currRating);
      }
    } catch (err) {}
  });

  return currRating;
}

// same as above, but using other function
function part2() {
  const input = readInput();

  return input.reduce((acc, row, i) => {
    return (
      acc +
      row.reduce((acc2, val, j) => {
        if (val === "0") {
          return acc2 + findTrailRating(input, i, j, 0);
        }
        return acc2;
      }, 0)
    );
  }, 0);
}

console.log(part1());
// console.log(t);

//console.log(part2());
