import { readFileSync } from "fs";

function readInput() {
  return readFileSync("./input.txt", "utf-8").split("\n");
}

function countWinning() {
  const input = readInput();

  return input.reduce((acc, card) => {
    // get the list of winning and current nums
    const winning = card.split(" | ")[0].split(": ")[1].split(" ");
    const currNum = card.split(" | ")[1].split(" ");

    // count the number of winning numbers we have
    const points = winning.reduce((cardSum, num) => {
      if (num !== "") {
        if (currNum.includes(num)) {
          return cardSum + 1;
        }
      }
      return cardSum;
    }, 0);

    // we can calculate the points by 2^(points - 1)
    if (points > 0) {
      return acc + Math.pow(2, points - 1);
    }
    return acc;
  }, 0);
}

// part2 idea: create an array the size of the game to hold the num of copies
// as we win, update the num in the array so we know of many copies we have
function countCards() {
  const input = readInput();

  const numOfCards = Array.from({ length: input.length }, () => 1);

  input.forEach((card, idx) => {
    // get the list of winning and current nums
    const winning = card.split(" | ")[0].split(": ")[1].split(" ");
    const currNum = card.split(" | ")[1].split(" ");

    // count the number of winning numbers we have
    const points = winning.reduce((cardSum, num) => {
      if (num !== "") {
        if (currNum.includes(num)) {
          return cardSum + 1;
        }
      }
      return cardSum;
    }, 0);

    // update the cards from the current index to how many points we have
    // make sure to add whatever the current value is to replicate the instances
    for (let i = idx + 1; i < idx + points + 1; i++) {
      numOfCards[i] += numOfCards[idx];
    }
  });

  // count the total num of cards we have
  return numOfCards.reduce((acc, count) => acc + count, 0);
}

//console.log(countWinning());
console.log(countCards());
