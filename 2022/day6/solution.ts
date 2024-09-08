import * as fs from "fs";

function readFile() {
  return fs.readFileSync("./input.txt", "utf-8");
}

function findPacketStart() {
  const buffer = readFile();
  let i = 0;
  let j = 4;
  while (j < buffer.length) {
    // take four chars at a time and test if there are any duplicates
    const fourChars = buffer.slice(i, j).split("");
    if (
      fourChars.filter((char, idx) => fourChars.includes(char, idx + 1))
        .length === 0
    ) {
      return j;
    }
    i += 1;
    j += 1;
  }
}

// same as above but set the offset to 14 rather than 4
function findMessageMarker() {
  const buffer = readFile();
  let i = 0;
  let j = 14;
  while (j < buffer.length) {
    // take four chars at a time and test if there are any duplicates
    const fourChars = buffer.slice(i, j).split("");
    if (
      fourChars.filter((char, idx) => fourChars.includes(char, idx + 1))
        .length === 0
    ) {
      return j;
    }
    i += 1;
    j += 1;
  }
}

//console.log(findPacketStart());
console.log(findMessageMarker());
