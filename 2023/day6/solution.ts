/*
Part 1 idea:
To find distance: how ever long you hold it * remaining time
The "holding button time" to distance creates a parabola
The max distance we can travel is (totalTime / 2)

1. Find the max and set as currTime
2. Loop through the currTime and check distance, subtract one each time
3. Once we hit a time where we don't surpass distance, break
4. Double the answer we get to account for the other half of the times
5. If total time is even subtract one from final answer
*/

import { readFileSync } from "fs";

function readInput() {
  const input = readFileSync("./test-input.txt", "utf-8").split("\n");

  return {
    time: input[0]
      .split(" ")
      .filter((time) => Number(time))
      .map((time) => Number(time)),
    distance: input[1]
      .split(" ")
      .filter((time) => Number(time))
      .map((time) => Number(time)),
  };
}

function countWins() {
  const timeAndDistance = readInput();
  const times = timeAndDistance.time;
  const dists = timeAndDistance.distance;

  return times.reduce((acc, time, idx) => {
    const dist = dists[idx];
    let currTime = Math.floor(time / 2);
    let cnt = 0;
    while (currTime >= 0) {
      const travel = (time - currTime) * currTime;
      if (travel > dist) {
        cnt += 1;
      } else {
        break;
      }
      currTime -= 1;
    }

    if (time % 2 === 0) {
      return acc * (cnt * 2 - 1);
    } else {
      return acc * (cnt * 2);
    }
  }, 1);
}

/* 
Part 2:
Same idea as above, just a single race
*/

// made new input function since we are reading it differently
function readInput2() {
  const input = readFileSync("./input.txt", "utf-8").split("\n");

  return {
    time: Number(
      input[0]
        .split(" ")
        .filter((time) => Number(time))
        .reduce((acc, val) => acc + val, "")
    ),
    distance: Number(
      input[1]
        .split(" ")
        .filter((time) => Number(time))
        .reduce((acc, val) => acc + val, "")
    ),
  };
}

function countOneRaceWin() {
  const input = readInput2();

  const time = input.time;
  const dist = input.distance;

  let currTime = Math.floor(time / 2);
  let cnt = 0;
  while (currTime >= 0) {
    const travel = (time - currTime) * currTime;
    if (travel > dist) {
      cnt += 1;
    } else {
      break;
    }
    currTime -= 1;
  }

  if (time % 2 === 0) {
    return cnt * 2 - 1;
  } else {
    return cnt * 2;
  }
}

//console.log(countWins());
console.log(countOneRaceWin());
