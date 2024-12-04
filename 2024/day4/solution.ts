import { readFileSync } from "fs";

function readInput() {
  return readFileSync("./input.txt", "utf-8")
    .split("\n")
    .map((line) => line.split(""));
}

const directions = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
  [-1, -1],
  [-1, 1],
  [1, 1],
  [1, -1],
];

// helper function that recurses in a direction to parse out the XMAS string
function containsXmas(
  wordSearch: string[][],
  postion: number[],
  direction: number[],
  expectedVal: string
) {
  if (
    postion[0] < 0 ||
    postion[0] >= wordSearch.length ||
    postion[1] < 0 ||
    postion[1] >= wordSearch[0].length
  ) {
    return false;
  }
  const currVal = wordSearch[postion[0]][postion[1]];

  if (currVal !== expectedVal) return false;

  switch (currVal) {
    case "X":
      expectedVal = "M";
      break;
    case "M":
      expectedVal = "A";
      break;
    case "A":
      expectedVal = "S";
      break;
    case "S":
      return true;
  }

  return containsXmas(
    wordSearch,
    [postion[0] + direction[0], postion[1] + direction[1]],
    direction,
    expectedVal
  );
}

function part1() {
  const input = readInput();

  return input.reduce(
    (acc, line, rowIdx) =>
      acc +
      line.reduce((acc2, val, colIdx) => {
        // if we hit an X, recurse through directions to check if it is XMAS
        if (val === "X") {
          return (
            acc2 +
            directions
              .map((dir) => containsXmas(input, [rowIdx, colIdx], dir, "X"))
              .filter((val) => val).length
          );
        }
        return acc2;
      }, 0),
    0
  );
}

//console.log(part1());

const crossDirections = [
  [-1, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
];

// helper fuction to check if diag values are valid
function containsX_mas(wordSearch: string[][], postion: number[]) {
  try {
    const crossVals = crossDirections.map(
      (dir) => wordSearch[postion[0] + dir[0]][postion[1] + dir[1]]
    );

    if (
      (crossVals[0] === "S" && crossVals[1] === "M") ||
      (crossVals[0] === "M" && crossVals[1] === "S")
    ) {
      if (
        (crossVals[2] === "S" && crossVals[3] === "M") ||
        (crossVals[2] === "M" && crossVals[3] === "S")
      ) {
        return 1;
      }
    }
  } catch (err) {
    return 0;
  }

  return 0;
}

function part2() {
  const input = readInput();

  return input.reduce(
    (acc, line, rowIdx) =>
      acc +
      line.reduce((acc2, val, colIdx) => {
        if (val === "A") {
          return acc2 + containsX_mas(input, [rowIdx, colIdx]);
        }
        return acc2;
      }, 0),
    0
  );
}

console.log(part2());
