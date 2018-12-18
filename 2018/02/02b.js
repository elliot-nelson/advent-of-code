// Advent of Code 2018 Day 02b

function chars(line) {
    let hash = {};
    for (let i = 0; i < line.length; i++) {
        hash[line[i]] = (hash[line[i]] || 0) + 1;
    }
    return hash;
}

function filter(lines) {
    let twice = 0, thrice = 0;

    for (let i = 0; i < lines.length; i++) {
        let hash = chars(lines[i]), hasTwice, hasThrice;

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

const lines = require('fs').readFileSync('input.txt', 'utf8').split('\n');
console.log(findIdenticalChars(lines));
