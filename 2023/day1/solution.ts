import { readFileSync } from "fs";

function readInput() {
  return readFileSync("./input.txt", "utf-8").split("\n");
}

// part one
function findFirstAndLast() {
  const lines = readInput();

  return lines.reduce((acc, line) => {
    // put all nums in a line in a single string
    let numstr = "";
    for (let i = 0; i < line.length; i++) {
      if (Number(line[i])) {
        numstr += line[i];
      }
    }

    // get the first and last num in numstr, or double it
    const num =
      numstr.length > 1
        ? Number(numstr[0] + numstr[numstr.length - 1])
        : Number(numstr[0] + numstr[0]);

    console.log(num);

    return acc + num;
  }, 0);
}

// part two
function findSpelledOut() {
  const lines = readInput();

  // keep first and last letters in case they are needed for other strs
  const numstrmap = {
    one: "o1e",
    two: "t2o",
    three: "t3e",
    four: "f4r",
    five: "f5e",
    six: "s6x",
    seven: "s7n",
    eight: "e8t",
    nine: "n9e",
  };

  return lines.reduce((acc, line) => {
    // find if line incl numstr and replace it
    for (const [key, value] of Object.entries(numstrmap)) {
      if (line.includes(key)) {
        line = line.replaceAll(key, value);
      }
    }

    // same as part 1
    let numstr = "";
    for (let i = 0; i < line.length; i++) {
      if (Number(line[i])) {
        numstr += line[i];
      }
    }

    console.log(line);

    // get the first and last num in numstr, or double it
    const num =
      numstr.length > 1
        ? Number(numstr[0] + numstr[numstr.length - 1])
        : Number(numstr[0] + numstr[0]);

    console.log(num);

    return acc + num;
  }, 0);
}

//console.log(findFirstAndLast());
console.log(findSpelledOut());
