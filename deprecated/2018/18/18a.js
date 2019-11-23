// Advent of Code 2018 Day 18a

function adjacent(map, x, y) {
    let result = { '|': 0, '#': 0, '.': 0 };
    result[map[y - 1][x]]++;
    result[map[y - 1][x - 1]]++;
    result[map[y - 1][x + 1]]++;
    result[map[y][x - 1]]++;
    result[map[y][x + 1]]++;
    result[map[y + 1][x]]++;
    result[map[y + 1][x - 1]]++;
    result[map[y + 1][x + 1]]++;
    return result;
}

function step(map) {
    let next = map.map(x => x.slice(0));

    for (let y = 1; y < 51; y++) {
        for (let x = 1; x < 51; x++) {
            let adj = adjacent(map, x, y);
            if (map[y][x] === '.' && adj['|'] >= 3) next[y][x] = '|';
            else if (map[y][x] === '|' && adj['#'] >= 3) next[y][x] = '#';
            else if (map[y][x] === '#' && (adj['#'] < 1 || adj['|'] < 1)) next[y][x] = '.';
        }
    }

    return next;
}

function count(map) {
    let result = { '|': 0, '#': 0, '.': 0 };
    for (let y = 1; y < 51; y++) {
        for (let x = 1; x < 51; x++) {
            result[map[y][x]]++;
        }
    }
    return result;
}

function run(map, minutes) {
    //for (let i = 0; i < 10; i++) {
    for (let i = 0; i < 1000000000; i++) {
        map = step(map);
        let c = count(map);
        console.log(i, c['|'] * c['#']);
    }

    let c = count(map);

    console.log(c);
    return c['|'] * c['#'];
}

const lines = require('fs').readFileSync('input.txt', 'utf8').split('\n');
let map = lines.map(x => [' '].concat(x.split('')).concat([' ']));
map.unshift([' ']);
map.push([' ']);
console.log(run(map, 10));
