import { readFileSync } from "fs";

function readInput() {
  const input = readFileSync("./input.txt", "utf-8").split("\n");

  return {
    rules: input.filter((line) => line.includes("|")),
    updates: input.filter((line) => line.includes(",")),
  };
}

// helper function to create our rule map
function createRuleOrderings(rules: string[]) {
  // make a map of the page number and all the page numbers that must come after it
  const ruleOrdering: { [key: string]: string[] } = {};

  rules.forEach((rule) => {
    const before = rule.split("|")[0];
    if (before in ruleOrdering) {
      ruleOrdering[before].push(rule.split("|")[1]);
    } else {
      ruleOrdering[before] = [rule.split("|")[1]];
    }
  });

  return ruleOrdering;
}

function part1() {
  const { rules, updates } = readInput();

  const ruleOrdering = createRuleOrderings(rules);

  // go backwards through the updates to see if any pages break the rules
  return updates.reduce((acc, update) => {
    const reversedUpdate = update.split(",").reverse();

    for (let i = 0; i < reversedUpdate.length; i++) {
      // some page numbers don't have rules
      if (!(reversedUpdate[i] in ruleOrdering)) {
        continue;
      }

      const expectedOrder = ruleOrdering[reversedUpdate[i]];

      if (i !== reversedUpdate.length - 1) {
        // checks that pages are in the expected order
        if (
          reversedUpdate.slice(i).some((val) => expectedOrder.includes(val))
        ) {
          return acc;
        }
      }
    }
    // if in the expected order then we add the middle page number
    return acc + Number(reversedUpdate[Math.floor(reversedUpdate.length / 2)]);
  }, 0);
}

function part2() {
  const { rules, updates } = readInput();

  const ruleOrdering = createRuleOrderings(rules);

  // now go backwards through the updates and fix them
  return updates.reduce((acc, update) => {
    const reversedUpdate = update.split(",").reverse();

    let i = 0;
    let wasFixed = false;
    while (i < reversedUpdate.length) {
      // some page numbers don't have rules
      if (!(reversedUpdate[i] in ruleOrdering)) {
        i += 1;
        continue;
      }

      const expectedOrder = ruleOrdering[reversedUpdate[i]];

      // get the index of number in wrong order (will be -1 if not found)
      const wrongIdx = reversedUpdate
        .slice(i)
        .findIndex((val) => expectedOrder.includes(val));

      if (wrongIdx !== -1) {
        // get the wrong page number (add back i since we sliced)
        const wrongNum = reversedUpdate[wrongIdx + i];
        // remove wrong number and add it behind curr index
        reversedUpdate.splice(wrongIdx + i, 1);
        reversedUpdate.splice(i, 0, wrongNum);

        wasFixed = true;

        // move i back one to check with the fixed number
        i -= 1;
      } else {
        i += 1;
      }
    }

    // if the update was fixed then add the middle number
    if (wasFixed) {
      return (
        acc + Number(reversedUpdate[Math.floor(reversedUpdate.length / 2)])
      );
    }
    return acc;
  }, 0);
}

//console.log(part1());
console.log(part2());
