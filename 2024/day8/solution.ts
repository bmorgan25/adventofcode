import { readFileSync } from "fs";

function readInput() {
  return readFileSync("./input.txt", "utf-8")
    .split("\n")
    .map((line) => line.split(""));
}

// track the anti node positions across each individual map
const anitNodePos: string[] = [];

// not a very pretty solution, but it works
function findAntiNodes(map: string[][]) {
  // so we don't double check the same antena
  const vistiedAntenaPos: string[] = [];

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      // first find the antena position
      if (map[i][j] !== "." && map[i][j] !== "#") {
        // go through a calculate the anti nodes for that antena
        for (let a = 0; a < map.length; a++) {
          for (let b = 0; b < map[0].length; b++) {
            if (a === i && b === j) continue;
            if (
              map[a][b] !== "." &&
              map[a][b] !== "#" &&
              !vistiedAntenaPos.includes(`${a},${b}`)
            ) {
              // get the x and y distance between the antenas
              const distai = Math.abs(i - a);
              const distbj = Math.abs(j - b);

              // specific actions if the next antena is "behind" the current one
              if (b < j) {
                // check bounds for next antena
                if (a + distai < map.length && b - distbj >= 0) {
                  // make sure we don't have an anti node there already
                  if (!anitNodePos.includes(`${a + distai},${b - distbj}`)) {
                    map[a + distai][b - distbj] = "#";
                    anitNodePos.push(`${a + distai},${b - distbj}`);
                  }
                }
                // check bound for current antena
                if (i - distai >= 0 && j + distbj < map[0].length) {
                  // make sure we don't have an anti node there already
                  if (!anitNodePos.includes(`${i - distai},${j + distbj}`)) {
                    map[i - distai][j + distbj] = "#";
                    anitNodePos.push(`${i - distai},${j + distbj}`);
                  }
                }
                // specific actions if the next antena is "in front of" the current one
              } else if (b > j) {
                if (a + distai < map.length && b + distbj < map[0].length) {
                  if (!anitNodePos.includes(`${a + distai},${b + distbj}`)) {
                    map[a + distai][b + distbj] = "#";
                    anitNodePos.push(`${a + distai},${b + distbj}`);
                  }
                }

                if (i - distai >= 0 && j - distbj >= 0) {
                  if (!anitNodePos.includes(`${i - distai},${j - distbj}`)) {
                    map[i - distai][j - distbj] = "#";
                    anitNodePos.push(`${i - distai},${j - distbj}`);
                  }
                }
                // specific actions if the next antena is "in line" the current one
              } else {
                if (a + distai < map.length) {
                  if (!anitNodePos.includes(`${a + distai},${b}`)) {
                    map[a + distai][b] = "#";
                    anitNodePos.push(`${a + distai},${b}`);
                  }
                }
                if (i - distai >= 0) {
                  if (!anitNodePos.includes(`${i - distai},${j}`)) {
                    map[i - distai][j] = "#";
                    anitNodePos.push(`${i - distai},${j}`);
                  }
                }
              }
            }
          }
        }
        // save the visited antena
        vistiedAntenaPos.push(`${i},${j}`);
      }
    }
  }

  // return the number of # in the map
  return map.reduce(
    (acc, row) =>
      (acc += row.reduce((acc2, val) => (acc2 += val === "#" ? 1 : 0), 0)),
    0
  );
}

function part1() {
  const input = readInput();

  let total = 0;
  const visitedAntenas: string[] = [];

  input.forEach((row) => {
    row.forEach((val) => {
      if (val !== "." && !visitedAntenas.includes(val)) {
        // when we hit a "new" antena, parse out a map of just those values
        const filteredInput = input.map((row) =>
          row.map((pos) => (pos !== val ? "." : val))
        );
        // find the anti nodes for just those antenas
        total += findAntiNodes(filteredInput);
        visitedAntenas.push(val);
      }
    });
  });

  return total;
}

const antiNodeLine: string[] = [];

// basically the same as above, but instead we are placing # at every position
function findAntiNodesLines(map: string[][]) {
  // keep track of visted antenas
  const vistiedAntenaPos: string[] = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      // first find the antena position
      if (map[i][j] !== "." && map[i][j] !== "#") {
        // go through and calculate anitnodes for that antena
        for (let a = 0; a < map.length; a++) {
          for (let b = 0; b < map[0].length; b++) {
            if (a === i && b === j) continue;
            if (
              map[a][b] !== "." &&
              map[a][b] !== "#" &&
              !vistiedAntenaPos.includes(`${a},${b}`)
            ) {
              // find the x and y distance from the two antenas
              const distai = Math.abs(i - a);
              const distbj = Math.abs(j - b);

              // specific actions if the next antena is "behind" the current one
              if (b < j) {
                // here we just iterate through and add a # at every distance
                let x = a + distai;
                let y = b - distbj;

                while (x < map.length && y >= 0) {
                  if (!antiNodeLine.includes(`${x},${y}`)) {
                    map[x][y] = "#";
                    antiNodeLine.push(`${x},${y}`);
                  }
                  x += distai;
                  y -= distbj;
                }

                x = i - distai;
                y = j + distbj;

                while (x >= 0 && y < map[0].length) {
                  if (!antiNodeLine.includes(`${x},${y}`)) {
                    map[x][y] = "#";
                    antiNodeLine.push(`${x},${y}`);
                  }
                  x -= distai;
                  y += distbj;
                }
                // specific actions if the next antena is "in front of" the current one
              } else if (b > j) {
                let x = a + distai;
                let y = b + distbj;

                while (x < map.length && y < map[0].length) {
                  if (!antiNodeLine.includes(`${x},${y}`)) {
                    map[x][y] = "#";
                    antiNodeLine.push(`${x},${y}`);
                  }
                  x += distai;
                  y += distbj;
                }

                x = i - distai;
                y = j - distbj;

                while (x >= 0 && y >= 0) {
                  if (!antiNodeLine.includes(`${x},${y}`)) {
                    map[x][y] = "#";
                    antiNodeLine.push(`${x},${y}`);
                  }
                  x -= distai;
                  y -= distbj;
                }
                // specific actions if the next antena is "in line with" the current one
              } else {
                let x = a + distai;
                let y = b;

                while (x < map.length) {
                  if (!antiNodeLine.includes(`${x},${y}`)) {
                    map[x][y] = "#";
                    antiNodeLine.push(`${x},${y}`);
                  }
                  x += distai;
                }

                x = i - distai;

                while (x >= 0) {
                  if (!antiNodeLine.includes(`${x},${y}`)) {
                    map[x][y] = "#";
                    antiNodeLine.push(`${x},${y}`);
                  }
                  x -= distai;
                }
              }
            }
          }
        }
        // finally, check if we are counting the current antena as a anti node
        if (!antiNodeLine.includes(`${i},${j}`)) {
          map[i][j] = "#";
          antiNodeLine.push(`${i},${j}`);
        }
        vistiedAntenaPos.push(`${i},${j}`);
      }
    }
  }

  // return the number of # in the map
  return map.reduce(
    (acc, row) =>
      (acc += row.reduce((acc2, val) => (acc2 += val === "#" ? 1 : 0), 0)),
    0
  );
}

// the same as part 1 but help function is different
function part2() {
  const input = readInput();

  let total = 0;
  const visitedAntenas: string[] = [];

  input.forEach((row) => {
    row.forEach((val) => {
      if (val !== "." && !visitedAntenas.includes(val)) {
        const filteredInput = input.map((row) =>
          row.map((pos) => (pos !== val ? "." : val))
        );
        total += findAntiNodesLines(filteredInput);
        visitedAntenas.push(val);
      }
    });
  });

  return total;
}

//console.log(part1());
console.log(part2());
