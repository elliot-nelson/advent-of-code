// ------------------------------------------------------------------------
// Year 2017 Day 01
// ------------------------------------------------------------------------
const { log, success } = require('../../util');

function captcha(string, jump) {
    let sum = 0;
    for (let i = 0; i < string.length; i++) {
        let j = (i + jump) % string.length;
        if (string[i] === string[j]) {
            sum += parseInt(string[i], 10);
        }
    }
    return sum;
}

module.exports = function solve(lines) {
    //// Part 1 ////
    let result1 = captcha(lines[0], 1);
    success('Part 1', result1);

    //// Part 2 ////
    let result2 = captcha(lines[0], lines[0].length / 2);
    success('Part 2', result2);
};
