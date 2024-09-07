import * as fs from "fs";

function readFile() {
  return fs.readFileSync("./input.txt", "utf-8").split("\n");
}

function findPriority() {
  return readFile().reduce((acc, sack) => {
    // split string in half
    const comp1 = sack.slice(0, sack.length / 2).split("");
    const comp2 = sack.slice(sack.length / 2).split("");

    // find duplicate of the two arrays
    const duplicate = comp1.filter((item1) =>
      comp2.some((item2) => item2 === item1)
    )[0];

    // calculate the priority
    if (duplicate === duplicate.toUpperCase()) {
      acc += duplicate.charCodeAt(0) - 65 + 27; //'A' == 65
    } else {
      acc += duplicate.charCodeAt(0) - 96; // 'a' == 97
    }
    return acc;
  }, 0);
}

function findBadgePriority() {
  let totalBadgePriority = 0;
  const sacks = readFile();

  // get every three sacks
  for (let i = 2; i < sacks.length; i += 3) {
    // put the three sacks into an array and reduce
    totalBadgePriority += [sacks.slice(i - 2, i + 1)].reduce((acc, sack) => {
      const sack1 = sack[0].split("");
      const sack2 = sack[1].split("");
      const sack3 = sack[2].split("");

      // find the duplicate value in the three stacks
      const duplicate = sack1.filter(
        (item) =>
          sack2.some((item2) => item2 === item) &&
          sack3.some((item3) => item3 === item)
      )[0];

      // calculate the priority
      if (duplicate === duplicate.toUpperCase()) {
        acc += duplicate.charCodeAt(0) - 65 + 27; //'A' == 65
      } else {
        acc += duplicate.charCodeAt(0) - 96; // 'a' == 97
      }
      return acc;
    }, 0);
  }
  return totalBadgePriority;
}

//console.log(findPriority());
console.log(findBadgePriority());
