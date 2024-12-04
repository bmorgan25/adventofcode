import { readFileSync } from "fs";

function readInput() {
  return readFileSync("./input.txt", "utf-8").split("\n");
}

function part1() {
  const input = readInput();

  // use regex to find all instances of "mul(num,num)"
  const regex = /mul\(\d+,\s*\d+\)/g;

  return input.reduce(
    (acc, line) =>
      acc +
      Array.from(line.matchAll(regex))
        .map((match) => match[0])
        .map((match) => {
          const nums = match.split("(")[1].split(")")[0];
          return Number(nums.split(",")[0]) * Number(nums.split(",")[1]);
        })
        .reduce((acc2, prodVal) => acc2 + prodVal, 0),
    0
  );
}

function part2() {
  const input = readInput();

  // use regex to find all instances of mul(), do(), and don't()
  const regex = /mul\(\d+,\s*\d+\)|do\(\)|don't\(\)/g;

  // use flag to track when we need to multiple or skip
  let doMult = true;

  return input.reduce(
    (acc, line) =>
      acc +
      Array.from(line.matchAll(regex))
        .map((match) => match[0])
        .map((match) => {
          if (match === "do()") {
            doMult = true;
          } else if (match === "don't()") {
            doMult = false;
          } else {
            if (doMult) {
              const nums = match.split("(")[1].split(")")[0];
              return Number(nums.split(",")[0]) * Number(nums.split(",")[1]);
            }
          }
          return -1;
        })
        .filter((match) => match !== -1)
        .reduce((acc2, prod) => acc2 + prod, 0),
    0
  );
}

console.log(part1());

console.log(part2());
