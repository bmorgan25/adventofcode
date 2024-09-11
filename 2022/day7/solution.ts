import * as fs from "fs";

function readFile() {
  return fs.readFileSync("./input.txt", "utf-8").split("\n");
}

/**
 First idea was to create a tree of the directories, using something like:
 
  { 
    "/": {dirs: ["a", "d"], fileSize: 352345},
    "a": {dirs: ["e"], fileSize: 1456940},
    ...
  }

Then perform a DFS to calculate the correct total sizes of the directories.

But after discovering that there can be duplicate directory names, it was proven that this solution was not
correct in solving the issue. 
*/

// keep a string of our current path, updating our object as we go along
function traverse() {
  const commands = readFile();
  let dirMap: { [key: string]: number } = { "/": 0 };
  // start at home director
  let currPath = "/";

  commands.forEach((command, idx) => {
    // skip first entry, since it is just "cd /"
    if (idx === 0) {
      return;
    }
    if (command.startsWith("$ cd")) {
      const dir = command.split(" ")[2];
      // go up a dir, so remove the last dir in our path
      if (dir === "..") {
        let temp = currPath.split(",");
        temp.pop();
        currPath = temp.join(",");
      } else {
        // moving to new dir, so append that to our path
        currPath += `,${dir}`; // use comma since / taken
        dirMap[currPath] = 0;
      }
    } else {
      if (!command.startsWith("dir") && !(command === "$ ls")) {
        // get the file size for the current dir
        const fileSize = Number(command.split(" ")[0]);
        // traverse backwards, updating each dir in our current path
        let traverseBackPath = currPath;
        while (traverseBackPath && traverseBackPath !== "/") {
          dirMap[traverseBackPath] += fileSize;
          const temp = traverseBackPath.split(",");
          temp.pop();
          traverseBackPath = temp.join(",");
        }
        // finally, update home dir, since it is the break point
        dirMap["/"] += fileSize;
      }
    }
  });

  let total = 0;
  Object.keys(dirMap).forEach((dir) => {
    if (dirMap[dir] <= 100000) {
      total += dirMap[dir];
    }
  });
  return total;
}

/*
  1. calc space needed
  2. find dirs over that
  3. take the smallest one
*/
function findSmallestDeletableDir() {
  // same as above in calculating the directories and their sizes
  const commands = readFile();
  let dirMap: { [key: string]: number } = { "/": 0 };
  // start at home director
  let currPath = "/";

  commands.forEach((command, idx) => {
    // skip first entry, since it is just "cd /"
    if (idx === 0) {
      return;
    }
    if (command.startsWith("$ cd")) {
      const dir = command.split(" ")[2];
      // go up a dir, so remove the last dir in our path
      if (dir === "..") {
        let temp = currPath.split(",");
        temp.pop();
        currPath = temp.join(",");
      } else {
        // moving to new dir, so append that to our path
        currPath += `,${dir}`; // use comma since / taken
        dirMap[currPath] = 0;
      }
    } else {
      if (!command.startsWith("dir") && !(command === "$ ls")) {
        // get the file size for the current dir
        const fileSize = Number(command.split(" ")[0]);
        // traverse backwards, updating each dir in our current path
        let traverseBackPath = currPath;
        while (traverseBackPath && traverseBackPath !== "/") {
          dirMap[traverseBackPath] += fileSize;
          const temp = traverseBackPath.split(",");
          temp.pop();
          traverseBackPath = temp.join(",");
        }
        // finally, update home dir, since it is the break point
        dirMap["/"] += fileSize;
      }
    }
  });

  // calculate the space needed
  const spaceNeeded = 30000000 - (70000000 - dirMap["/"]);

  // filter out directories smaller than the space needed
  const validDirs = Object.keys(dirMap).filter(
    (path) => dirMap[path] > spaceNeeded
  );

  // find the smallest of the remaining directories
  let smallest = 30000000;
  validDirs.forEach((path) => {
    if (dirMap[path] < smallest) {
      smallest = dirMap[path];
    }
  });

  return smallest;
}

//console.log(traverse());
console.log(findSmallestDeletableDir());
