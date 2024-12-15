import { readFileSync } from "fs";

type Game = {
  a: number[];
  b: number[];
  prize: number[];
};

function readInput() {
  const input = readFileSync("./input.txt", "utf-8").split("\n");

  const games: Game[] = [];

  input.forEach((row, i) => {
    if (row.includes("Button A")) {
      games.push({
        a: row.match(/\d+/g)!.map((n) => Number(n)),
        b: input[i + 1].match(/\d+/g)!.map((n) => Number(n)),
        prize: input[i + 2].match(/\d+/g)!.map((n) => Number(n)),
      });
    }
  });

  return games;
}

function part1() {
  const games = readInput();

  return games.reduce((acc, game) => {
    // Cramer's rule

    const aCnt =
      (game.prize[0] * game.b[1] - game.prize[1] * game.b[0]) /
      (game.a[0] * game.b[1] - game.a[1] * game.b[0]);
    const bCnt =
      (game.a[0] * game.prize[1] - game.a[1] * game.prize[0]) /
      (game.a[0] * game.b[1] - game.a[1] * game.b[0]);

    if (Number.isInteger(aCnt) && Number.isInteger(bCnt)) {
      return acc + (3 * aCnt + bCnt);
    }

    return acc;
  }, 0);
}

function part2() {
  const games = readInput();

  const offset = 10000000000000;

  return games.reduce((acc, game) => {
    // Cramer's rule

    game.prize[0] += offset;
    game.prize[1] += offset;

    const aCnt =
      (game.prize[0] * game.b[1] - game.prize[1] * game.b[0]) /
      (game.a[0] * game.b[1] - game.a[1] * game.b[0]);
    const bCnt =
      (game.a[0] * game.prize[1] - game.a[1] * game.prize[0]) /
      (game.a[0] * game.b[1] - game.a[1] * game.b[0]);

    if (Number.isInteger(aCnt) && Number.isInteger(bCnt)) {
      return acc + (3 * aCnt + bCnt);
    }

    return acc;
  }, 0);
}

//console.log(part1());
console.log(part2());
