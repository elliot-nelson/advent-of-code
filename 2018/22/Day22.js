class Day22 {
    constructor(input) {
        this.input = input;
    }

    getErosionLevel(x, y) {
        this.map[y] = this.map[y] || [];

        if (this.map[y][x]) {
            return this.map[y][x].erosionLevel;
        }

        let gIndex;

        if (x === 0 && y === 0) {
            gIndex = 0;
        } else if (x === this.target.x && y === this.target.y) {
            gIndex = 0;
        } else if (y === 0) {
            gIndex = x * 16807;
        } else if (x === 0) {
            gIndex = y * 48271;
        } else {
            gIndex = this.getErosionLevel(x - 1, y) * this.getErosionLevel(x, y - 1);
        }

        let erosionLevel = (gIndex + this.depth) % 20183;

        this.map[y][x] = { erosionLevel };
        return erosionLevel;
    }

    getType(x, y) {
        // 0=Rocky, 1=Wet, 2=Narrow
        return this.getErosionLevel(x, y) % 3;
    }

    run() {
        this.depth = parseInt(this.input[0].split(': ')[1], 10);
        let coords = this.input[1].split(': ')[1].split(',');
        this.target = {
            x: parseInt(coords[0], 10),
            y: parseInt(coords[1], 10)
        };

        this.map = [];

        console.log(this);

        // Part 1

        let totalRisk = 0;
        let string = '';
        for (let y = 0; y <= this.target.y; y++) {
            for (let x = 0; x <= this.target.x; x++) {
                let risk = this.getErosionLevel(x, y) % 3;
                string += {
                    0: '.', 1: '=', 2: '|'
                }[risk];
                totalRisk += risk;
            }
            string += '\n';
        }

        console.log(string);
        console.log('Total Risk: ' + totalRisk);

        // Part 2

        // Modal flood fill, pretty ugly brute force, but it works (takes ~4 minutes on my MBPro).
        // Your "state" is [X][Y][Gear]. I am sorting the queue every time and always following
        // shortest elapsed path, which means we are following tons of totally useless threads
        // (even wandering away from the target quite drastically).

        let allowed = {
            0: ['CG', 'T'],
            1: ['CG', 'N'],
            2: ['T', 'N']
        };
        let region;
        let queue = [
            { x: 0, y: 0, gear: 'T', elapsed: 0 }
        ];

        let explore = (r, x, y) => {
            let cost = 1, gear = r.gear;

            if (x < 0 || y < 0) return;
            if (x === r.x && y === r.y) {
                // "Exploring" your own square means switching gear
                cost = 7;
                let allowedGear = allowed[this.getType(r.x, r.y)];
                gear = allowedGear[(allowedGear.indexOf(gear) + 1) % 2];
            } else if (!allowed[this.getType(x, y)].includes(gear)) {
                let allowedGear = allowed[this.getType(r.x, r.y)];
                gear = allowedGear[(allowedGear.indexOf(gear) + 1) % 2];
                cost += 7;
            }

            // Track "lowest cost seen on a map region so far" separately by gear type, otherwise
            // the cost numbers could be deceiving.
            if (this.map[y][x][gear] === undefined || this.map[y][x][gear] > r.elapsed + cost) {
                queue.push({ x, y, gear, elapsed: r.elapsed + cost });
                this.map[y][x][gear] = r.elapsed + cost;
            }
        };

        while (true) {
            region = queue.shift();
            if (region.x === this.target.x && region.y === this.target.y) {
                if (region.gear === 'T') {
                    break;
                } else {
                    // It's important not to just "add 7 and break here": you need to sort the
                    // "land on the square and swap gear" solution against all the others, below,
                    // to make sure there isn't a faster path that already had Torch equipped.
                    explore(region, region.x, region.y);
                }
            }

            explore(region, region.x, region.y - 1);
            explore(region, region.x + 1, region.y);
            explore(region, region.x, region.y + 1);
            explore(region, region.x - 1, region.y);

            // Always examine paths with the least time elapsed first
            queue = queue.sort((a, b) => {
                return a.elapsed - b.elapsed;
            });
        }

        // Print final location, including elapsed minutes
        console.log(region);
    }
}
module.exports = Day22;
