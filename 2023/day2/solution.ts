import { readFileSync } from "fs";

function readInput() {
  return readFileSync("./input.txt", "utf-8").split("\n");
}

function possibleGames() {
  const lines = readInput();

  const totalCubes: { [key: string]: number } = {
    red: 12,
    green: 13,
    blue: 14,
  };

  return lines.reduce((acc, game) => {
    // get the rounds
    const rounds = game.split(": ")[1].split("; ");
    let validRound = true;
    rounds.forEach((cubes) => {
      const counts = cubes.split(", ");
      // check the cube counts dont exceed the total values
      counts.forEach((count) => {
        if (Number(count.split(" ")[0]) > totalCubes[count.split(" ")[1]])
          validRound = false;
      });
    });
    // add the id if the round is valid
    if (validRound) {
      return acc + Number(game.split(": ")[0].split(" ")[1]);
    }
    return acc;
  }, 0);
}

function findMinimum() {
  const lines = readInput();

  return lines.reduce((acc, game) => {
    const rounds = game.split(": ")[1].split("; ");
    const minPossible: { [key: string]: number } = {
      red: 0,
      green: 0,
      blue: 0,
    };
    rounds.forEach((round) => {
      console.log(round);
      const cubes = round.split(", ");
      cubes.forEach((cube) => {
        const val = Number(cube.split(" ")[0]);
        const color = cube.split(" ")[1];
        if (val > minPossible[color]) {
          minPossible[color] = val;
        }
      });
    });
    console.log(minPossible);
    console.log(minPossible.red * minPossible.green * minPossible.blue);
    return acc + minPossible.red * minPossible.green * minPossible.blue;
  }, 0);
}

//console.log(possibleGames());

console.log(findMinimum());
