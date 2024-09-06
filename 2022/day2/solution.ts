import * as fs from "fs";

function readFile() {
  return fs.readFileSync("./input.txt", "utf-8").split("\n");
}

// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors
function perfectScore() {
  const scores: {
    [key: string]: { win: string; tie: string; points: number };
  } = {
    X: { win: "C", tie: "A", points: 1 },
    Y: { win: "A", tie: "B", points: 2 },
    Z: { win: "B", tie: "C", points: 3 },
  };
  let totalPoints = 0;
  readFile().forEach((game) => {
    const hands = game.split(" ");
    let points = scores[hands[1]].points; // inital points
    if (hands[0] === scores[hands[1]].win) {
      points += 6;
    } else if (hands[0] === scores[hands[1]].tie) {
      points += 3;
    }
    totalPoints += points;
  });
  return totalPoints;
}

// Y -> draw: Take points of the hand + 3
// X -> loss: determind what loses, take points of that hand
// Z -> win: determin what wins, take points of that hand + 6
function endRound() {
  const scores: {
    [key: string]: { win: number; loss: number; tie: number };
  } = {
    A: { win: 8, loss: 3, tie: 4 },
    B: { win: 9, loss: 1, tie: 5 },
    C: { win: 7, loss: 2, tie: 6 },
  };
  let totalPoints = 0;
  readFile().forEach((game) => {
    const hands = game.split(" ");
    if (hands[1] === "Y") {
      totalPoints += scores[hands[0]].tie;
    } else if (hands[1] === "X") {
      totalPoints += scores[hands[0]].loss;
    } else if (hands[1] === "Z") {
      totalPoints += scores[hands[0]].win;
    }
  });
  return totalPoints;
}

//console.log(perfectScore());
console.log(endRound());
