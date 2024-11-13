// part 1: turn into matrix, go through each, when hit num
// check all 8 directions, if symbol: record the num -> move on so we don't double count it

// part 2: when we hit a '*' check all 8 directions for nums
// when we find a num, parse it out and save to list
// check if list len is == 2 and multiply

import { readFileSync } from "fs";

function readInput() {
  return readFileSync("./input.txt", "utf-8")
    .split("\n")
    .map((row) => row.split(""));
}

function findParts() {
  const input = readInput();

  let i = 0;
  let j = 0;

  let sum = 0;

  while (i < input.length) {
    while (j < input[0].length) {
      // have to explicitly check for 0, because 0 === false
      if (input[i][j] === "0" || Number(input[i][j])) {
        let currNum = "";
        // check the directions for symbols
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (x === 0 && y === 0) continue;
            // make sure coors are in bounds
            if (
              i + x >= 0 &&
              i + x < input.length &&
              j + y >= 0 &&
              j + y < input[0].length
            ) {
              if (
                input[i + x][j + y] !== "." &&
                input[i + x][j + y] !== "0" &&
                !Number(input[i + x][j + y])
              ) {
                // parse out the number
                let a = j;
                while (input[i][a] === "0" || Number(input[i][a])) {
                  a -= 1;
                }
                a += 1;
                while (input[i][a] === "0" || Number(input[i][a])) {
                  currNum += input[i][a];
                  a += 1;
                }
                j = a;
                break;
              }
            }
          }
          // if we found a number we break so we don't double count it
          if (currNum) {
            console.log(currNum);
            sum += Number(currNum);
            break;
          }
        }
      }
      j += 1;
    }
    j = 0;
    i += 1;
  }
  return sum;
}

function findGears() {
  const input = readInput();

  let i = 0;
  let j = 0;

  let sum = 0;

  while (i < input.length) {
    while (j < input[0].length) {
      if (input[i][j] === "*") {
        // save nums adjecent to *
        const currNums: string[] = [];
        let x = -1;
        let y = -1;
        while (x <= 1) {
          while (y <= 1) {
            if (x === 0 && y === 0) {
              y += 1;
              continue;
            }
            if (
              i + x >= 0 &&
              i + x < input.length &&
              j + y >= 0 &&
              j + y < input[0].length
            ) {
              if (input[i + x][j + y] === "0" || Number(input[i + x][j + y])) {
                // parse out the number
                let currNum = "";

                let a = i + x;
                let b = j + y;
                //console.log(a, b, input[a][b]);
                while (input[a][b] === "0" || Number(input[a][b])) {
                  b -= 1;
                }
                b += 1;
                while (input[a][b] === "0" || Number(input[a][b])) {
                  currNum += input[a][b];
                  b += 1;
                }
                // subtract the space we have moved
                y = b - j;
                currNums.push(currNum);
              }
            }
            y += 1;
          }
          y = -1;
          x += 1;
        }
        // if adjecent nums are equal to 2 we multiply
        if (currNums.length === 2) {
          sum += Number(currNums[0]) * Number(currNums[1]);
        }
      }
      j += 1;
    }
    j = 0;
    i += 1;
  }
  return sum;
}

//console.log(findParts());
console.log(findGears());
// 76795548 -- too low
