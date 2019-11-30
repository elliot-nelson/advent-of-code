// ------------------------------------------------------------------------
// utilities for our solution modules
// ------------------------------------------------------------------------
const chalk = require('chalk');

const util = {
  p: (...args) => console.log(...args),
  part1: value => util.log.part1(value),
  part2: value => util.log.part2(value),

  log: {
    info: console.log,
    part1: value => {
      util.log.info('  Part 1: ' + chalk.green(value));
    },
    part2: value => {
      util.log.info('  Part 2: ' + chalk.green(value));
    }
  },
  sum(...args) {
    let total = 0;
    for (let arg of args) total += arg;
    return total;
  },
  sequence(start, end) {
    let list = [];
    for (let i = start; i <= end; i++) {
      list.push(i);
    }
    return list;
  },
  stringToHex(string) {
    let result = '';
    for (let i = 0; i < string.length; i++) {
      result += ('00' + string.charCodeAt(i).toString(16)).slice(-2);
    }
    return result;
  },
  fill2d(width, height, value) {
    let array = [];
    for (let y = 0; y < height; y++) {
      array[y] = [];
      for (let x = 0; x < width; x++) {
        array[y][x] = value;
      }
    }
    return array;
  }
};

module.exports = util;
