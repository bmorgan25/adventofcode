import * as fs from "fs";

function createForest() {
  return fs
    .readFileSync("./test-input.txt", "utf-8")
    .split("\n")
    .map((row) => row.split(""));
}

function findVisibleTress() {
  const forest = createForest();
  let visible: number[] = [];

  // check cols
  let i = 1;
  let j = 0;
}
