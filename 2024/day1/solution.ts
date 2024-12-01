import { readFileSync } from "fs";

function readInput() {
  return readFileSync("input.txt", "utf-8").split("\n");
}

function part1() {
  // collect the two lists of numbers
  let list1: number[] = [];
  let list2: number[] = [];

  readInput().forEach((line) => {
    list1.push(Number(line.split("   ")[0]));
    list2.push(Number(line.split("   ")[1]));
  });

  // sort them
  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  // calculate the sum of distances
  return list1.reduce((acc, num, idx) => acc + Math.abs(num - list2[idx]), 0);
}

function part2() {
  const input = readInput();

  // create a frequency map for the right side
  const s: { [key: string]: number } = {};

  input.forEach((line) => {
    const num2 = line.split("   ")[1];
    if (!(num2 in s)) {
      s[num2] = 1;
    } else {
      s[num2] += 1;
    }
  });

  // go through left side and calculate frequency
  return input.reduce((acc, line) => {
    const num1 = Number(line.split("   ")[0]);
    if (num1 in s) {
      return acc + num1 * s[num1];
    }
    return acc;
  }, 0);
}

//console.log(part1());
console.log(part2());
