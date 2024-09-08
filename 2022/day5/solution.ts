import * as fs from "fs";

/**
 * Return an object of the following
 {
    stacks: [[N,Z],[D,C,M],[P]],
    moves: [[move, from, to], [1,2,1]...]
 }
 */
function readFile() {
  const input = fs.readFileSync("./input.txt", "utf-8").split("\n");

  // The empty line where crates and moves split
  const sepIdx = input.indexOf("") - 1;
  // find the line with the row numbers to determine how many stacks we need
  let positions = input[sepIdx].split(" ").filter((val) => val);

  const stacks: string[][] = Array.from(
    Array(Number(positions[positions.length - 1])),
    () => []
  );
  const moves: number[][] = [];

  input.forEach((line, idx) => {
    const row = line.split(" ");
    // parse the crates from the row
    if (idx < sepIdx) {
      let i = 0;
      let stackPos = 0;
      while (i < row.length) {
        if (!row[i]) {
          i += 4; // each row has 4 empty strings for a empty crate position
          stackPos += 1;
        } else {
          stacks[stackPos].push(row[i]);
          stackPos += 1;
          i += 1;
        }
      }
      // parse out the moves (skip empty line)
    } else if (row[0]) {
      moves.push([Number(row[1]), Number(row[3]), Number(row[5])]);
    }
  });

  return {
    // get rid of brackets
    stacks: stacks.map((crate) =>
      crate.map((val) => val.replace("[", "").replace("]", ""))
    ),
    moves: moves,
  };
}

function findTopCrates() {
  const input = readFile();

  let stackTop = new Array(input.moves[0].length);

  input.moves.forEach((move) => {
    // use reverse to simulate them moving in order of top to bottom
    const cratesMoved = input.stacks[move[1] - 1].splice(0, move[0]).reverse();
    input.stacks[move[2] - 1].unshift(...cratesMoved);
    // update the top crates
    stackTop = [input.stacks.map((stack) => stack[0])];
  });
  return stackTop;
}

// using CrateMove 9001 (same as above, minus reverse call)
function findTopCratesPt2() {
  const input = readFile();

  let stackTop = new Array(input.moves[0].length);

  input.moves.forEach((move) => {
    // don't use reverse to simulate moving in order
    const cratesMoved = input.stacks[move[1] - 1].splice(0, move[0]);
    input.stacks[move[2] - 1].unshift(...cratesMoved);
    // update the top crates
    stackTop = [input.stacks.map((stack) => stack[0])];
  });
  return stackTop;
}

//console.log(findTopCrates());
console.log(findTopCratesPt2());
