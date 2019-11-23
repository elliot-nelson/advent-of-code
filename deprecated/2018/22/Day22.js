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

    getEstimatedCost(x, y, elapsed) {
        let k = Math.floor(1.1 * (Math.abs(x - this.target.x) + Math.abs(y - this.target.y)) + elapsed);
        return k;
    }

    getType(x, y) {
        // 0=Rocky, 1=Wet, 2=Narrow
        return this.getErosionLevel(x, y) % 3;
    }

    sort(queue) {
        let bestIndex = 0, bestValue = Infinity;

        for (let i = 0; i < queue.length; i++) {
            if (queue[i].estimate < bestValue) {
                bestIndex = i;
                bestValue = queue[i].estimate;
            }
        }

        return [queue[bestIndex]].concat(queue.slice(0, bestIndex), queue.slice(bestIndex + 1));
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

        let examined = 0;
        while (true) {
            examined++;
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

            queue.forEach(a => a.estimate = this.getEstimatedCost(a.x, a.y, a.elapsed));

            // Sort paths
            //
            // Going breadth first (sort by elapsed) is classic flood fill, it allows
            // us to eliminate more nodes in the queue quicker (because we reach the
            // edge of the 150% filter), but you end up examing many more nodes.
            //
            // For my input, it takes ~624,000 examined nodes, with a consistent queue of
            // ~2200 nodes being sorted for each step, ending at the solution of 1078.
            //
            // Going best-estimate-first (sort by estimated) is more like an A*, we
            // examine far fewer nodes before reaching an answer, but each node takes
            // more time because the queue of nodes to sort is longer. Total time is
            // lower overall.
            //
            // For my input, it takes ~219,000 examined nodes, with a consistent queue of
            // ~4200 nodes being sorted each step, ending at the solution of 1078.
            //
            // An additional optimization is not sorting, but just grabbing the most promising
            // node and shoving it to the front of the queue.
            //
            // Finally, by slightly favoring distance to target over elapsed time, we can "tighten"
            // the search and reduce total nodes examined to ~168,000. For my input, 10% works;
            // going to 50% ends the search instantly with an incorrect solution. In practice you
            // would want the highest weight you can use without going over the cost of swapping gear.
            //queue = queue.sort((a, b) => a.estimate - b.estimate);
            queue = this.sort(queue);

            // Now trim the queue - anything with an estimated cost of 50% higher than
            // our current best estimate, we can discard. (Arbitrary.)
            queue = queue.filter(a => a.estimate < queue[0].estimate * 1.5);

            if (examined % 1000 === 0) {
                console.log([examined, queue.length, queue[queue.length - 1].elapsed, queue[queue.length - 1].estimate]);
            }
        }

        // Print final location, including elapsed minutes
        console.log(region);
    }
}
module.exports = Day22;
