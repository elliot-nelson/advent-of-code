// ------------------------------------------------------------------------
// utilities for our solution modules
// ------------------------------------------------------------------------
const chalk = require('chalk');

const util = {
  log: console.log,
  success: (title, value) => {
    util.log('  ' + title + ': ' + chalk.green(value));
  }
};

module.exports = util;
