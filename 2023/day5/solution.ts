import { readFileSync } from "fs";

// returns obj like:
// {
//     seeds: [],
//     maps: [[[seed-soil], [seed-soil]...], [[soil-fert], [soil-fert]...], ...]
// }
function readInput() {
  const input = readFileSync("./test-input.txt", "utf-8").split("\n");
  const seeds = input[0].split(": ")[1].split(" ");
  const maps: string[][][] = [[]];
  let idx = 0;
  input
    .slice(2)
    .filter((line) => !line.includes("map"))
    .map((line) => line.split(" "))
    .forEach((vals) => {
      if (vals[0] !== "") {
        maps[idx].push(vals);
      } else {
        maps.push([]);
        idx += 1;
      }
    });

  return {
    seeds: seeds,
    maps: maps,
  };
}

function findSmallestLocation() {
  const seedsAndMaps = readInput();
  const seeds = seedsAndMaps.seeds;
  const maps = seedsAndMaps.maps;

  let lowest = Number.MAX_VALUE;

  seeds.forEach((s) => {
    let seed = Number(s);
    maps.forEach((currMap) => {
      // use for loop so we can break
      for (const ranges of currMap) {
        // find min and max of the source range
        const sourceRangeMin = Number(ranges[1]);
        const sourceRangeMax = Number(ranges[1]) + Number(ranges[2]) - 1;

        // check if seed falls between the two
        if (seed <= sourceRangeMax && seed >= sourceRangeMin) {
          // find the diff and add to the destination
          const diff = seed - sourceRangeMin;
          seed = Number(ranges[0]) + diff;
          break;
        }
      }
    });

    if (seed < lowest) {
      lowest = seed;
    }
  });

  return lowest;
}

// idea for part 2:
// start with range of seeds: [79, 92], [55, 67]
// compare each seed-range to the map ranges,
// if there is a split, just split the array
// so if one range is from [81, 87] ==> new seed ranges [79, 80], [81, 87], [88, 92]
// then find the smallest one

function findRangeLocation() {
  const seedsAndMaps = readInput();

  // turn the seeds into ranges of values
  const seedRanges: number[][][] = seedsAndMaps.seeds
    .map((seed, idx) => {
      if (idx % 2 === 0) {
        return [
          [
            Number(seed),
            Number(seed) + Number(seedsAndMaps.seeds[idx + 1]) - 1,
          ],
        ];
      } else {
        return undefined;
      }
    })
    .filter((seedRange) => !!seedRange);

  console.log(seedRanges);

  const maps = seedsAndMaps.maps;

  let lowest = Number.MAX_VALUE;

  seedRanges.forEach((seedRange) => {
    maps.forEach((currMap) => {
      for (const subRange of seedRange) {
        for (const ranges of currMap) {
          const sourceRangeMin = Number(ranges[1]);
          const sourceRangeMax = Number(ranges[1]) + Number(ranges[2]) - 1;

          // if the whole seed range fits
          if (subRange[0] >= sourceRangeMin && subRange[1] <= sourceRangeMax) {
            const minDiff = subRange[0] - sourceRangeMin;
            const maxDiff = subRange[1] - sourceRangeMin;
            subRange[0] = Number(ranges[0]) + minDiff;
            subRange[1] = Number(ranges[0]) + maxDiff;
            console.log(seedRange);
            break;
          }

          // if upper part of range fits
          if (
            !(subRange[0] >= sourceRangeMin) &&
            subRange[1] <= sourceRangeMax
          ) {
            const newRange = [subRange[0], Number(sourceRangeMin) - 1];
            seedRange.push(newRange);
            subRange[0] = Number(sourceRangeMin);
            const minDiff = subRange[0] - sourceRangeMin;
            const maxDiff = subRange[1] - sourceRangeMin;
            subRange[0] = Number(ranges[0]) + minDiff;
            subRange[1] = Number(ranges[0]) + maxDiff;
            console.log(seedRange);
            break;
          }

          // if lower part of range fits
          if (
            subRange[0] >= sourceRangeMin &&
            !(subRange[1] <= sourceRangeMax)
          ) {
            const newRange = [Number(sourceRangeMax) + 1, subRange[1]];
            seedRange.push(newRange);
            subRange[1] = Number(sourceRangeMax);
            const minDiff = subRange[0] - sourceRangeMin;
            const maxDiff = subRange[1] - sourceRangeMin;
            subRange[0] = Number(ranges[0]) + minDiff;
            subRange[1] = Number(ranges[0]) + maxDiff;
            console.log(seedRange);
            break;
          }
        }
      }
    });

    seedRange.forEach((range) =>
      range.forEach((seed) => {
        if (seed < lowest) {
          lowest = seed;
        }
      })
    );
  });

  return lowest;
}

//console.log(findSmallestLocation());
console.log(findRangeLocation());

// [
//     [ [ '50', '98', '2' ], [ '52', '50', '48' ] ],
//     [ [ '0', '15', '37' ], [ '37', '52', '2' ], [ '39', '0', '15' ] ],
//     [
//       [ '49', '53', '8' ],
//       [ '0', '11', '42' ],
//       [ '42', '0', '7' ],
//       [ '57', '7', '4' ]
//     ],
//     [ [ '88', '18', '7' ], [ '18', '25', '70' ] ],
//     [ [ '45', '77', '23' ], [ '81', '45', '19' ], [ '68', '64', '13' ] ],
//     [ [ '0', '69', '1' ], [ '1', '0', '69' ] ],
//     [ [ '60', '56', '37' ], [ '56', '93', '4' ] ]
//   ]
