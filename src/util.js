// ------------------------------------------------------------------------
// utilities for our solution modules
// ------------------------------------------------------------------------
const chalk = require('chalk');

const util = {
  log: {
    info: console.log,
    part1: value => {
      util.log.info('  Part 1: ' + chalk.green(value));
    },
    part2: value => {
      util.log.info('  Part 2: ' + chalk.green(value));
    }
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
