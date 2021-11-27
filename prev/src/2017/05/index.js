// ------------------------------------------------------------------------
// Year YYYY Day DD
// ------------------------------------------------------------------------
const { log } = require('../../util');

function countSteps(jumps) {
  let ptr = 0, steps = 0;

  for (;;) {
    steps++;
    ptr += (jumps[ptr]++);
    if (ptr < 0 || ptr >= jumps.length) break;
  }

  return steps;
}

function countSteps2(jumps) {
  let ptr = 0, steps = 0;

  for (;;) {
    steps++;
    ptr += (jumps[ptr] >= 3 ? jumps[ptr]-- : jumps[ptr]++);
    if (ptr < 0 || ptr >= jumps.length) break;
  }

  return steps;
}

module.exports = function solve(lines) {
  let jumps = lines.map(value => parseInt(value, 10));

  //// Part 1 ////
  let result1 = countSteps(jumps.slice(0));
  log.part1(result1);

  //// Part 2 ////
  let result2 = countSteps2(jumps.slice(0));
  log.part2(result2);
};
