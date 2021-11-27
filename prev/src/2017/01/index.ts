// ------------------------------------------------------------------------
// Year 2017 Day 01
// ------------------------------------------------------------------------
import { log } from '../../util';

function captcha(string: string, jump: number) {
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
    log.part1(result1);

    //// Part 2 ////
    let result2 = captcha(lines[0], lines[0].length / 2);
    log.part2(result2);
};
