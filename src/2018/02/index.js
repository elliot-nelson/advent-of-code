// ------------------------------------------------------------------------
// 2018/02
// ------------------------------------------------------------------------
const { log } = require('../../util');

function countOccurrences(line) {
    let hash = {};
    for (let i = 0; i < line.length; i++) {
        hash[line[i]] = (hash[line[i]] || 0) + 1;
    }
    return hash;
}

function checksum(lines) {
    let twice = 0, thrice = 0;

    for (let i = 0; i < lines.length; i++) {
        let hash = countOccurrences(lines[i]), hasTwice, hasThrice;

        Object.keys(hash).forEach(key => {
            if (hash[key] === 2) { hasTwice = true; }
            if (hash[key] === 3) { hasThrice = true; }
        });

        if (hasTwice) twice++;
        if (hasThrice) thrice++;
    }

    return twice * thrice;
}

function diff(a, b) {
    let count = 0;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) count++;
    }
    return count;
}

function findSimilar(lines) {
    while (lines.length > 0) {
        let line = lines.shift();

        for (let i = 0; i < lines.length; i++) {
            if (diff(line, lines[i]) === 1) return [line, lines[i]];
        }
    }
}

function findIdenticalChars(lines) {
    let [a, b] = findSimilar(lines);
    let str = '';

    for (let i = 0; i < a.length; i++) {
        if (a[i] === b[i]) str += a[i];
    }

    return str;
}

module.exports = function solve(lines) {
    //// Part 1 ////
    let result1 = checksum(lines);
    log(`Part 1: ${result1}`);

    //// Part 2 ////
    let result2 = findIdenticalChars(lines);
    log(`Part 2: ${result2}`);
};
