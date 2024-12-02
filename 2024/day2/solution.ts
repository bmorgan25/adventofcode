import { readFileSync } from "fs";

function readInput() {
  return readFileSync("./input.txt", "utf-8").split("\n");
}

function part1() {
  const input = readInput();

  return input.reduce((acc, line) => {
    const report = line.split(" ").map((val) => Number(val));
    let isDesc = false;
    let isAsc = false;
    let isSafe = true;

    for (let i = 1; i < report.length; i++) {
      if (report[i] > report[i - 1]) {
        isAsc = true;
      } else {
        isDesc = true;
      }

      const dist = Math.abs(report[i] - report[i - 1]);
      if (dist > 3 || dist < 1) {
        isSafe = false;
        break;
      }
    }

    if ((isAsc && isDesc) || !isSafe) {
      return acc;
    }
    return acc + 1;
  }, 0);
}

// helper function for part 2
function isValid(report: number[]) {
  if (report[0] === report[1]) {
    return { isValid: false, idx: 0 };
  }

  const isDesc = report[0] > report[1];

  for (let i = 0; i < report.length - 1; i++) {
    if (report[i] < report[i + 1]) {
      if (isDesc) return { isValid: false, idx: i };
    } else if (report[i] > report[i + 1]) {
      if (!isDesc) return { isValid: false, idx: i };
    } else {
      return { isValid: false, idx: i };
    }

    const dist = Math.abs(report[i] - report[i + 1]);
    if (dist > 3 || dist < 1) {
      return { isValid: false, idx: i };
    }
  }

  return { isValid: true, idx: -1 };
}

function part2() {
  const input = readInput();

  return input.reduce((acc, line) => {
    const report = line.split(" ").map((val) => Number(val));

    const validReport = isValid(report);

    if (!validReport.isValid) {
      // remove problem idx and check again
      const problemIdx = validReport.idx;
      let newValidReport = isValid(report.filter((_, i) => i !== problemIdx));
      if (!newValidReport.isValid) {
        // try removing next idx and check again
        newValidReport = isValid(report.filter((_, i) => i !== problemIdx + 1));
        if (!newValidReport.isValid) {
          // if idx is 1, we can try removing first idx and checking
          if (problemIdx === 1) {
            newValidReport = isValid(report.filter((_, i) => i !== 0));
            if (!newValidReport.isValid) {
              // report is not valid
              return acc;
            }
          } else {
            return acc;
          }
        }
      }
    }

    return acc + 1;
  }, 0);
}

//console.log(part1());
console.log(part2());
