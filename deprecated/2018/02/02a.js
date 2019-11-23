// Advent of Code 2018 Day 02a

function chars(line) {
    let hash = {};
    for (let i = 0; i < line.length; i++) {
        hash[line[i]] = (hash[line[i]] || 0) + 1;
    }
    return hash;
}

function checksum(lines) {
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

const lines = require('fs').readFileSync('input.txt', 'utf8').split('\n');
console.log(checksum(lines));
