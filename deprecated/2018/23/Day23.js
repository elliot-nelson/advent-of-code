class Day23 {
    constructor(input) {
        this.input = input;
    }

    distance(a, b) {
        return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
    }

    countPointInRange(point) {
        let inRange = 0;
        for (let i = 0; i < this.bots.length; i++) {
            if (this.distance(point, this.bots[i].pos) <= this.bots[i].radius) inRange++;
        }
        return inRange;
    }

    search(space) {
        let size = space.bounds[1].map((x, i) => x - space.bounds[0][i]);
        let step = size.map(x => Math.floor(x / 10));

        let results = [];

        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                for (let z = 0; z < 10; z++) {
                    let bounds = [
                        [x * step[0], y * step[1], z * step[2]],
                        []
                    ];
                    bounds[1].push(x === 9 ? space.bounds[1][0] : (x+1) * step[0]);
                    bounds[1].push(y === 9 ? space.bounds[1][1] : (y+1) * step[1]);
                    bounds[1].push(z === 9 ? space.bounds[1][2] : (z+1) * step[2]);

                    let sample = [
                        bounds[0][0] + step[0] / 2,
                        bounds[0][1] + step[1] / 2,
                        bounds[0][2] + step[2] / 2
                    ].map(x => Math.floor(x));

                    results.push({
                        bounds: bounds,
                        count: this.countPointInRange(sample)
                    });
                }
            }
        }

        return results;
    }

    run() {
        let bots = this.input.map(line => {
            let match = line.match(/pos=\<(-?\d+),(-?\d+),(-?\d+)\>, r=(-?\d+)/).map(x => parseInt(x, 10));
            return {
                pos: [match[1], match[2], match[3]],
                radius: match[4]
            };
        });

        this.bots = bots;

        // Part 1

        let widestBot = bots.sort((a, b) => b.radius - a.radius)[0];
        console.log(widestBot);

        let inRange = 0;
        for (let i = 0; i < bots.length; i++) {
            if (this.distance(widestBot.pos, bots[i].pos) <= widestBot.radius) inRange++;
        }
        console.log('In range: ' + inRange);

        for (let i = 0; i < bots.length; i++) {
            bots[i].inExtendedRange = 0;
            for (let j = 0; j < bots.length; j++) {
                if (this.distance(bots[i].pos, bots[j].pos) <= bots[i].radius + bots[j].radius) bots[i].inExtendedRange++;
            }
        }

        bots = bots.sort((a, b) => {
            let ans = b.inExtendedRange - a.inExtendedRange;
            if (ans === 0) {
                ans = a.radius - b.radius;
            }
            return ans;
        });

        console.log(bots.slice(0, 10));

        process.exit(0);

        // Part 2

        let bounds = [
            [Infinity, Infinity, Infinity],
            [0, 0, 0]
        ];
        for (let i = 0; i < bots.length; i++) {
            if (bots[i].pos[0] < bounds[0][0]) bounds[0][0] = bots[i].pos[0];
            if (bots[i].pos[1] < bounds[0][1]) bounds[0][1] = bots[i].pos[1];
            if (bots[i].pos[2] < bounds[0][2]) bounds[0][2] = bots[i].pos[2];
            if (bots[i].pos[0] > bounds[1][0]) bounds[1][0] = bots[i].pos[0];
            if (bots[i].pos[1] > bounds[1][1]) bounds[1][1] = bots[i].pos[1];
            if (bots[i].pos[2] > bounds[1][2]) bounds[1][2] = bots[i].pos[2];
        }

        let queue = [];
        queue.push({
            bounds: bounds,
            count: 0
        });
        console.log(bounds);

        let iter = 0;
        while (false) {
            let space = queue.shift();
            if (space.count === 532 && space.bounds[0][0] === 9849222) {
                console.log(this.search(space).sort((a, b) => b.count - a.count)[0]);
                process.exit(1);
            }
            queue = queue.concat(this.search(space));
            queue = queue.sort((a, b) => b.count - a.count);

            if (queue.length > 100000) {
                queue = queue.slice(0, 50000);
            }

            iter++;
            if (iter % 20 === 0) {
                console.log([
                    iter,
                    queue.length,
                    queue.slice(0, 10).map(x => x.bounds + " - " + (x.bounds[1][0] - x.bounds[0][0]) + " - " + x.count)
                ]);
            }
        }
    }
}
module.exports = Day23;
