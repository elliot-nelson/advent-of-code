// ------------------------------------------------------------------------
// Year 2018 Day 01
// ------------------------------------------------------------------------
const { log, success } = require('../../util');

module.exports = function solve(lines) {
  //// Part 1 /////
  let freq = 0;
  for (let line of lines) {
    freq += parseInt(line, 10);
  }
  let result1 = freq;
  success('Part 1', result1);

  //// Part 2 ////
  freq = 0;
  let hash = {};
  let found;
  for (;found === undefined;) {
    for (let line of lines) {
      freq += parseInt(line, 10);
      hash[freq] = (hash[freq]||0) + 1;
      if (hash[freq] > 1) {
        found = freq;
        break;
      }
    }
  }
  let result2 = freq;
  success('Part 2', result2);
};
