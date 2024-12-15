import { readFileSync } from "fs";

function readInput() {
  const input = readFileSync("./input.txt", "utf-8").split("\n");

  return input.map((line) => {
    return {
      pos: line.split(" ")[0].split("p=")[1],
      vel: line.split("v=")[1],
    };
  });
}

// find the future position of a robot at any given time
function findFuturePos(
  vel: number,
  time: number,
  bound: number,
  start: number
) {
  // the distance it will travel, minus how close it is to the edge of the map
  const unboundPos = vel * time - (bound - start);
  // use mod to bring that value back to the bounds of our map
  return ((unboundPos % bound) + bound) % bound;
}

function part1() {
  const input = readInput();

  const xBound = 103;
  const yBound = 101;
  const seconds = 100;

  // go through each robot and find their positions after 100 seconds
  const after100sec = input.map((robot) => {
    const xVel = Number(robot.vel.split(",")[1]);
    const yVel = Number(robot.vel.split(",")[0]);

    const xPos = Number(robot.pos.split(",")[1]);
    const yPos = Number(robot.pos.split(",")[0]);

    return {
      pos: `${findFuturePos(xVel, seconds, xBound, xPos)},${findFuturePos(
        yVel,
        seconds,
        yBound,
        yPos
      )}`,
      vel: robot.vel,
    };
  });

  // the mid line to seperate quadrents
  const middleX = Math.floor(xBound / 2);
  const middleY = Math.floor(yBound / 2);

  const quadrents = [0, 0, 0, 0];

  // go through and find what quadrents the robots are in
  after100sec.forEach((val) => {
    const xPos = Number(val.pos.split(",")[0]);
    const yPos = Number(val.pos.split(",")[1]);

    if (xPos < middleX && yPos < middleY) {
      quadrents[0] += 1;
    } else if (xPos > middleX && yPos < middleY) {
      quadrents[1] += 1;
    } else if (xPos < middleX && yPos > middleY) {
      quadrents[2] += 1;
    } else if (xPos > middleX && yPos > middleY) {
      quadrents[3] += 1;
    }
  });

  return quadrents.reduce((acc, val) => acc * val);
}

function part2() {
  let input = readInput();

  const xBound = 103;
  const yBound = 101;
  let seconds = 1;

  // go through as many seconds as we need
  while (true) {
    // same calc as above
    const after1sec = input.map((robot) => {
      const xVel = Number(robot.vel.split(",")[1]);
      const yVel = Number(robot.vel.split(",")[0]);

      const xPos = Number(robot.pos.split(",")[1]);
      const yPos = Number(robot.pos.split(",")[0]);

      return {
        pos: `${findFuturePos(xVel, seconds, xBound, xPos)},${findFuturePos(
          yVel,
          seconds,
          yBound,
          yPos
        )}`,
        vel: robot.vel,
      };
    });

    // set the map with the robot positions
    const map = Array.from(new Array(xBound), () => Array(yBound).fill("."));

    after1sec.forEach((val) => {
      const xPos = Number(val.pos.split(",")[0]);
      const yPos = Number(val.pos.split(",")[1]);

      map[xPos][yPos] = "#";
    });

    // look for a lot all in same place (probably the tree)
    const tree = map.map((row) => row.join("")).join("\n");
    if (tree.includes("###############################")) {
      console.log(seconds);
      console.log(tree);
      break;
    }

    seconds += 1;
  }

  return;
}

//console.log(part1());
console.log(part2());
