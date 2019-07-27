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
  }
};

module.exports = util;
