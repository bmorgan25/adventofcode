import { readFileSync } from "fs";

function readInput() {
  return readFileSync("input.txt", "utf-8");
}

function part1() {
  const input = readInput();

  // hold our block of free space and files
  const blocks: string[] = [];
  let blockId = 0;

  // create our block
  input
    .split("")
    .map((val) => Number(val))
    .forEach((val, idx) => {
      if (idx % 2 === 0) {
        for (let i = 0; i < val; i++) {
          blocks.push(`${blockId}`);
        }
        blockId += 1;
      } else {
        for (let i = 0; i < val; i++) {
          blocks.push(".");
        }
      }
    });

  // pointers for the top and bottom of the block
  let top = 0;
  let bottom = blocks.length - 1;

  while (top <= bottom) {
    // if top is on "." we move whatever is at bottom pos to this spot
    if (blocks[top] === ".") {
      while (blocks[bottom] === ".") {
        bottom -= 1;
      }
      const [val] = blocks.splice(bottom, 1);
      blocks.splice(top, 1, val);
      bottom -= 1;
    }
    top += 1;
  }

  // calculate the check sum
  return blocks.reduce((acc, val, idx) => {
    if (val !== ".") {
      return acc + Number(val) * idx;
    }
    return acc;
  }, 0);
}

function part2() {
  const input = readInput();

  // hold our block of files and free spaces
  const blocks: string[] = [];
  let blockId = 0;

  // create our block
  input
    .split("")
    .map((val) => Number(val))
    .forEach((val, idx) => {
      if (idx % 2 === 0) {
        for (let i = 0; i < val; i++) {
          blocks.push(`${blockId}`);
        }
        blockId += 1;
      } else {
        for (let i = 0; i < val; i++) {
          blocks.push(".");
        }
      }
    });

  // start at the end to calculate what we need to move
  let bottom = blocks.length - 1;
  // holds the values we have already passed over
  const calculated: string[] = [];

  while (bottom >= 0) {
    // if bottom is "." and we haven't checked it yet
    if (blocks[bottom] !== "." && !calculated.includes(blocks[bottom])) {
      // collect the files next to each other
      const files: string[] = [];
      const val = blocks[bottom];
      while (blocks[bottom] === val) {
        files.push(blocks[bottom]);
        bottom -= 1;
      }
      bottom += 1;

      calculated.push(val);

      // find the next available free spot for the files
      let top = 0;
      while (top < bottom) {
        if (blocks[top] === ".") {
          // find the space where the files could go
          const space: string[] = [];
          while (blocks[top] === ".") {
            space.push(blocks[top]);
            top += 1;
          }

          // if the files fit, move them
          if (space.length >= files.length) {
            const vals = blocks.slice(bottom, bottom + files.length);
            // replace the new empty spots with "."
            blocks.fill(".", bottom, bottom + files.length);
            blocks.splice(top - space.length, files.length, ...vals);
            break;
          }
        }
        top += 1;
      }
    }
    bottom -= 1;
  }

  // calculate the check sum
  return blocks.reduce((acc, val, idx) => {
    if (val !== ".") {
      return acc + Number(val) * idx;
    }
    return acc;
  }, 0);
}

//console.log(part1());
console.log(part2());
