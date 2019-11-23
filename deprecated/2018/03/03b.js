// Advent of Code 2018 Day 03b

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

    hasOverlap(map, x, y, w, h) {
        for (let j = 0; j < h; j++) {
            for(let i = 0; i < w; i++) {
                if (map[y+j][x+i] > 1) return true;
            }
        }
        return false;
    },

    run(input) {
        let map = [];
        let claims = [];
        for (let i = 0; i < input.length; i++) {
            let match = input[i].match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
            match = match.slice(1).map(x => parseInt(x, 10));
            claims.push(match);
            this.claim(map, match[1], match[2], match[3], match[4]);
        }

        for (let i = 0; i < claims.length; i++) {
            if (!this.hasOverlap(map, claims[i][1], claims[i][2], claims[i][3], claims[i][4])) {
                console.log(claims[i][0]);
                break;
            }
        }
    }
};

let lines = require('fs').readFileSync('input.txt', 'utf8').split('\n');
if (lines[lines.length-1] === '') lines.pop();
module.exports.run(lines);
