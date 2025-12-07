import { readFileSync } from "fs";

function readInput() {
  return readFileSync("./input.txt", "utf-8").split("\n");
}

// helper since ts/js doesn't properly mod negative numbers
function mod(a: number, b: number) {
  return ((a % b) + b) % b;
}

function countZeros() {
  const input = readInput();

  let pos = 50;
  let zeroCnt = 0;

  input.forEach((i) => {
    const diff = Number(i.slice(1));
    i[0] === "L" ? (pos -= diff) : (pos += diff);
    pos = mod(pos, 100);
    if (pos === 0) zeroCnt += 1;
  });

  return zeroCnt;
}

function countZeros2() {
  const input = readInput();

  let pos = 50;
  let zeroCnt = 0;

  input.forEach((i) => {
    const diff = Number(i.slice(1));

    // for every diff gt 100 we pass 0 at least once
    zeroCnt += Math.floor(diff / 100);

    const remainder = diff % 100;

    // check if remainder will also move us past 0
    // prevent double counts in case we are currently on 0
    if (i[0] === "L") {
      if (remainder > pos && pos != 0) zeroCnt += 1;
    } else {
      if (remainder > 100 - pos && pos != 0) zeroCnt += 1;
    }

    // simulate move like normal
    i[0] === "L" ? (pos -= diff) : (pos += diff);
    pos = mod(pos, 100);
    if (pos === 0) zeroCnt += 1;
  });

  return zeroCnt;
}

//console.log(countZeros());
console.log(countZeros2());
