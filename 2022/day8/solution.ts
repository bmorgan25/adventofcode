import * as fs from "fs";

function createforrest() {
  return fs
    .readFileSync("./input.txt", "utf-8")
    .split("\n")
    .map((row) => row.split("").map((val) => Number(val)));
}

function findVisibleTress() {
  const forrest = createforrest();
  let numOfVisible = 0;
  // for tracking tree positions we already have found
  let foundIndex: string[] = [];

  // inner trees
  // count rows - left side
  let i = 1;
  while (i < forrest.length - 1) {
    let j = 1;
    // start with the outer trees as base
    let biggestLeft = forrest[i][0];
    // stop one less so don't count outer trees
    while (j < forrest[0].length - 1) {
      if (forrest[i][j] > biggestLeft) {
        biggestLeft = forrest[i][j];
        if (!foundIndex.includes(`${i},${j}`)) {
          numOfVisible += 1;
          foundIndex.push(`${i},${j}`);
        }
      }
      j += 1;
    }
    i += 1;
  }

  // count rows - right side
  i = 1;
  while (i < forrest.length - 1) {
    let j = forrest[0].length - 2;
    // start with the outer trees as base
    let biggestRight = forrest[i][forrest[0].length - 1];
    // stop one less so don't count outer trees
    while (j > 0) {
      if (forrest[i][j] > biggestRight) {
        biggestRight = forrest[i][j];
        if (!foundIndex.includes(`${i},${j}`)) {
          numOfVisible += 1;
          foundIndex.push(`${i},${j}`);
        }
      }
      j -= 1;
    }
    i += 1;
  }

  // count cols - top to bottom
  let j = 1;
  while (j < forrest[0].length - 1) {
    let i = 1;
    // start with the outer trees as base
    let biggestTop = forrest[0][j];
    // stop one less so don't count outer trees
    while (i < forrest.length - 1) {
      if (forrest[i][j] > biggestTop) {
        biggestTop = forrest[i][j];
        if (!foundIndex.includes(`${i},${j}`)) {
          numOfVisible += 1;
          foundIndex.push(`${i},${j}`);
        }
      }
      i += 1;
    }
    j += 1;
  }

  // count cols - bottom to top
  j = 1;
  while (j < forrest[0].length - 1) {
    let i = forrest.length - 2;
    // start with the outer trees as base
    let biggestTop = forrest[forrest.length - 1][j];
    // stop one less so don't count outer trees
    while (i > 0) {
      if (forrest[i][j] > biggestTop) {
        biggestTop = forrest[i][j];
        if (!foundIndex.includes(`${i},${j}`)) {
          numOfVisible += 1;
          foundIndex.push(`${i},${j}`);
        }
      }
      i -= 1;
    }
    j += 1;
  }

  // add in the outer trees
  return numOfVisible + (forrest[0].length * 2 - 2) + (forrest.length * 2 - 2);
}

function findTreeVisibilty() {
  const forrest = createforrest();

  let maxScore = 0;
  // for each tree check to the right, left, up, and down
  for (let i = 1; i < forrest.length - 1; i++) {
    for (let j = 1; j < forrest[0].length - 1; j++) {
      // check right
      let x = i;
      let y = j + 1;
      let right = 1;
      while (y < forrest[0].length && forrest[i][j] > forrest[x][y]) {
        right += 1;
        y += 1;
      }
      if (y === forrest[0].length) {
        right -= 1;
      }

      // check left
      y = j - 1;
      let left = 1;
      while (y >= 0 && forrest[i][j] > forrest[x][y]) {
        left += 1;
        y -= 1;
      }
      if (y === -1) {
        left -= 1;
      }

      // check up
      y = j;
      x = i + 1;
      let up = 1;
      while (x < forrest.length && forrest[i][j] > forrest[x][y]) {
        up += 1;
        x += 1;
      }
      if (x === forrest.length) {
        up -= 1;
      }

      // check down
      x = i - 1;
      let down = 1;
      while (x >= 0 && forrest[i][j] > forrest[x][y]) {
        down += 1;
        x -= 1;
      }
      if (x === -1) {
        down -= 1;
      }

      const total = right * left * up * down;
      //console.log(right, left, up, down);
      if (total > maxScore) {
        maxScore = total;
      }
    }
  }
  return maxScore;
}

//console.log(findVisibleTress());
console.log(findTreeVisibilty());
