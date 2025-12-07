import { readFileSync } from "fs";

function readInput(): string[][] {
  return readFileSync("./test-input.txt", "utf-8")
    .split("\n")
    .map((row) => row.split(""));
}

// Part 1
function howManyTouching(map: string[][], x: number, y: number) {
  let touching = 0;

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;

    if (
      newX >= 0 &&
      newX < map.length &&
      newY >= 0 &&
      newY < map[0].length &&
      map[newX][newY] === "@"
    ) {
      touching += 1;
    }
  }

  return touching;
}

function findRolls() {
  const input: string[][] = readInput();

  // go through all input and check what rolls are accessible
  let accessible = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if (input[i][j] == "@") {
        if (howManyTouching(input, i, j) < 4) {
          accessible += 1;
        }
      }
    }
  }

  return accessible;
}

function removeRolls() {
  const input = readInput();

  // is true as long as there is a removable roll
  let removable = true;

  let total = 0;

  while (removable) {
    let accessible = 0;
    // go through the map and remove all of the rolls accessible
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[0].length; j++) {
        if (input[i][j] == "@") {
          if (howManyTouching(input, i, j) < 4) {
            input[i][j] = "x";
            total += 1;
            accessible += 1;
          }
        }
      }
    }

    if (accessible === 0) {
      removable = false;
    }
  }

  return total;
}

console.log(removeRolls());
