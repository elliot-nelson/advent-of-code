// ------------------------------------------------------------------------
// Year 2017 Day 06
// ------------------------------------------------------------------------
const { log } = require('../../util');

function mostBlocks(memory) {
  return memory.indexOf(Math.max(...memory));
}

function redistribute(memory) {
  memory = memory.slice();

  let idx = mostBlocks(memory);
  let blocks = memory[idx];
  memory[idx] = 0;

  while (blocks > 0) {
    idx = (idx + 1) % memory.length;
    memory[idx]++;
    blocks--;
  }

  return memory;
}

function calculateCycles(memory) {
  let hash = {};
  let cycles = 0;

  hash[memory.join(',')] = 0;

  for (;;) {
    cycles++;
    memory = redistribute(memory);
    let key = memory.join(',');
    if (hash[key] !== undefined) return [cycles, cycles - hash[key]];
    hash[key] = cycles;
  }
}

module.exports = function solve(lines) {
  let cycles = calculateCycles(lines[0].split(/\t+| +/).map(x => parseInt(x, 10)));

  //// Part 1 ////
  let result1 = cycles[0];
  log.part1(result1);

  //// Part 2 ////
  let result2 = cycles[1];
  log.part2(result2);
};
