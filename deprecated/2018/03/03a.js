// Advent of Code 2018 Day 03a

module.exports = {
    claim(map, x, y, w, h) {
        for (let j = 0; j < h; j++) {
            for(let i = 0; i < w; i++) {
                if (!map[y+j]) map[y+j] = [];
                if (!map[y+j][x+i]) map[y+j][x+i] = 0;
                map[y+j][x+i]++;
            }
        }
    },

    count(map) {
        let inches = 0;
        for (let j = 0; j < map.length; j++) {
            for (let i = 0; i < (map[j]||[]).length; i++) {
                if (map[j][i] > 1) inches++;
            }
        }

        return inches;
    },

    run(input) {
        let map = [];
        for (let i = 0; i < input.length; i++) {
            let match = input[i].match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
            match = match.slice(1).map(x => parseInt(x, 10));

            this.claim(map, match[1], match[2], match[3], match[4]);
        }

        console.log(this.count(map));
    }
};

let lines = require('fs').readFileSync('input.txt', 'utf8').split('\n');
if (lines[lines.length-1] === '') lines.pop();
module.exports.run(lines);
