// ------------------------------------------------------------------------
// Year 2017 Day 02
// ------------------------------------------------------------------------
const { log } = require('../../util');

function minMax(values) {
  let min = Math.min(...values);
  let max = Math.max(...values);
  return max - min;
}

function dividePair(values) {
  for (let i = 0; i < values.length; i++) {
    for (let j = i + 1; j < values.length; j++) {
      let a = values[i], b = values[j];
      if ((a / b) % 1 === 0) return a / b;
      if ((b / a) % 1 === 0) return b / a;
    }
  }
  throw null;
}

function checksum(lines, paired) {
  let result = 0;
  for (let line of lines) {
    let values = line.split('\t').map(x => parseInt(x, 10));
    if (paired)
      result += dividePair(values);
    else
      result += minMax(values);
  }
  return result;
}

module.exports = function solve(lines) {
  //// Part 1 ////
  let result1 = checksum(lines, false);
  log.part1(result1);

  //// Part 2 ////
  let result2 = checksum(lines, true);
  log.part2(result2);
};
