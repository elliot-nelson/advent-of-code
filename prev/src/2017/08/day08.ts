// ------------------------------------------------------------------------
// Year 2017 Day 08
// ------------------------------------------------------------------------
const { log } = require('../../util');

function parseInstruction(line) {
  let match = line.match(/(.+) (.+) (.+) if (.+) (.+) (.+)/);
  return {
    register: match[1],
    op: match[2],
    value: parseInt(match[3], 10),
    condition: {
      left: match[4],
      op: match[5],
      right: parseInt(match[6], 10)
    }
  };
}

function conditionMet(condition, state) {
  let left = state.r[condition.left] || 0;
  let right = condition.right;

  switch (condition.op) {
    case '<': return left < right;
    case '>': return left > right;
    case '<=': return left <= right;
    case '>=': return left >= right;
    case '==': return left == right;
    case '!=': return left !== right;
    default: throw new Error('missing op');
  }
}

function applyInstruction(instruction, state) {
  state.r[instruction.register] = state.r[instruction.register] || 0;

  switch (instruction.op) {
    case 'inc':
      state.r[instruction.register] += instruction.value;
      break;
    case 'dec':
      state.r[instruction.register] -= instruction.value;
      break;
    default:
      throw new Error('missing op');
  }

  state.highestValue = Math.max(state.highestValue, state.r[instruction.register]);
}

function run(instructions, state) {
  for (let instruction of instructions) {
    if (conditionMet(instruction.condition, state)) {
      applyInstruction(instruction, state);
    }
  }
}

module.exports = function solve(lines) {
  //// Part 1 ////
  let instructions = lines.map(line => parseInstruction(line));
  let state = {
    r: {},
    highestValue: 0
  };
  run(instructions, state);
  let result1 = Object.values(state.r).sort((a, b) => a - b).reverse()[0];
  log.part1(result1);

  //// Part 2 ////
  let result2 = state.highestValue;
  log.part2(result2);
};
