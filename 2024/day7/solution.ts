import { readFileSync } from "fs";

function readInput() {
  const input = readFileSync("input.txt", "utf-8").split("\n");
  return input.map((line) => ({
    target: Number(line.split(": ")[0]),
    vals: line
      .split(": ")[1]
      .split(" ")
      .map((num) => Number(num)),
  }));
}

// recursive solution
function validCalib(
  target: number,
  currVal: number,
  nums: number[],
  currNumPos: number
): boolean {
  if (currVal === target && currNumPos === nums.length) return true;

  if (currNumPos > nums.length - 1) return false;

  // check adding first
  if (validCalib(target, currVal + nums[currNumPos], nums, currNumPos + 1))
    return true;

  // need this so we don't multiply by 0
  if (currVal === 0) currVal += 1;

  // check multiplying
  return validCalib(target, currVal * nums[currNumPos], nums, currNumPos + 1);
}

function part1() {
  const calibrations = readInput();

  // add the target value if it is a valid calibration
  return calibrations.reduce(
    (acc, cal) =>
      (acc += validCalib(cal.target, 0, cal.vals, 0) ? cal.target : 0),
    0
  );
}

// the same as above, but adding in the concat factor
function validCalibConcat(
  target: number,
  currVal: number,
  nums: number[],
  currNumPos: number
): boolean {
  if (currVal === target && currNumPos === nums.length) return true;

  if (currNumPos > nums.length - 1) return false;

  // check adding the values
  if (
    validCalibConcat(target, currVal + nums[currNumPos], nums, currNumPos + 1)
  )
    return true;

  // use a temp value so we don't mess with the original value
  let temp = currVal;
  if (temp === 0) temp += 1;

  // check multiplying
  if (validCalibConcat(target, temp * nums[currNumPos], nums, currNumPos + 1))
    return true;

  // check concatinating
  return validCalibConcat(
    target,
    Number(`${currVal}${nums[currNumPos]}`),
    nums,
    currNumPos + 1
  );
}

function part2() {
  const calibrations = readInput();

  return calibrations.reduce(
    (acc, cal) =>
      (acc += validCalibConcat(cal.target, 0, cal.vals, 0) ? cal.target : 0),
    0
  );
}

//console.log(part1());
console.log(part2());
