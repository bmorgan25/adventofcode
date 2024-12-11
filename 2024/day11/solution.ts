import { readFileSync } from "fs";

function readInput() {
  return readFileSync("./input.txt", "utf-8").split(" ");
}

function part1() {
  const input = readInput();

  let blinkCnt = 25;

  // go through and apply all of the rules to the array of stones
  while (blinkCnt > 0) {
    for (let i = 0; i < input.length; i++) {
      if (input[i] === "0") {
        input[i] = "1";
      } else if (input[i].length % 2 !== 0) {
        input[i] = `${Number(input[i]) * 2024}`;
      } else {
        // split string in half and convert to number to get rid of leading zeros
        const front = Number(input[i].slice(0, input[i].length / 2));
        const back = Number(input[i].slice(input[i].length / 2));

        input.splice(i, 1, ...[`${front}`, `${back}`]);
        // skip ahead one so we don't count the val we just made
        i += 1;
      }
    }

    blinkCnt -= 1;
  }

  return input.length;
}

//console.log(part1());

// first I tried to just increase blinkCnt, but took too long :(
function part2() {
  const input = readInput();

  let blinkCnt = 75;

  // use stone map to hold stoneId: count of that id
  let stones: { [key: string]: number } = {};

  // initialize stone map
  input.forEach((stoneId) => {
    if (stoneId in stones) {
      stones[stoneId] += 1;
    } else {
      stones[stoneId] = 1;
    }
  });

  while (blinkCnt > 0) {
    // a new map of the updated stones and their counts
    const newStones: { [key: string]: number } = {};

    // go through stones and update map based on rules
    Object.keys(stones).forEach((stoneId) => {
      if (stoneId === "0") {
        newStones["1"] = stones[stoneId];
      } else if (stoneId.length % 2 !== 0) {
        newStones[`${Number(stoneId) * 2024}`] =
          stones[stoneId] + (newStones[`${Number(stoneId) * 2024}`] || 0);
      } else {
        const front = `${Number(stoneId.slice(0, stoneId.length / 2))}`;
        const back = `${Number(stoneId.slice(stoneId.length / 2))}`;

        newStones[front] = stones[stoneId] + (newStones[front] || 0);
        newStones[back] = stones[stoneId] + (newStones[back] || 0);
      }
    });

    // update our map
    stones = newStones;

    blinkCnt -= 1;
  }

  return Object.values(stones).reduce((acc, val) => acc + val);
}

console.log(part2());
