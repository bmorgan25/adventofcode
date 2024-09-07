import * as fs from "fs";

function readFile() {
  return fs.readFileSync("./input.txt", "utf-8").split("\n");
}

function getRangeArray(range: string) {
  const start = Number(range.split("-")[0]);
  const end = Number(range.split("-")[1]);

  return [...Array(end - start + 1).keys()].map((i) => i + start);
}

function findFullOverlap() {
  return readFile().reduce((acc, jobIds) => {
    // create an array of the values in the range
    const ranges = [
      getRangeArray(jobIds.split(",")[0]),
      getRangeArray(jobIds.split(",")[1]),
    ];

    // indexes of the smaller and larger ranges
    const smallestIdx = ranges[1].length < ranges[0].length ? 1 : 0;
    const largestIdx = smallestIdx === 0 ? 1 : 0;

    // check if every element in the smaller range exists in the larger range
    const duplicates = ranges[smallestIdx].filter((val) =>
      ranges[largestIdx].some((val2) => val === val2)
    );

    if (duplicates.length === ranges[smallestIdx].length) {
      acc += 1;
    }

    return acc + 1;
  }, 0);
}

// Use two pointers to see if any overlap exists
function findOverlaps() {
  return readFile().reduce((acc, jobIds) => {
    // create an array of the values in the range
    const ranges = [
      getRangeArray(jobIds.split(",")[0]),
      getRangeArray(jobIds.split(",")[1]),
    ];

    let i = 0;
    let j = 0;
    while (i < ranges[0].length && j < ranges[1].length) {
      if (ranges[0][i] === ranges[1][j]) {
        return acc + 1;
      } else if (ranges[0][i] < ranges[1][j]) {
        i += 1;
      } else {
        j += 1;
      }
    }

    return acc;
  }, 0);
}

//console.log(findFullOverlap());
console.log(findOverlaps());
