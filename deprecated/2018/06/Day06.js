class Day06 {
    constructor(input) {
        this.input = input;
    }

    distance(a, b) {
        return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
    }

    run() {
        let points = this.input.map(line => line.split(', ').map(x => parseInt(x, 10)));

        // Simple bounds - take the bounding box of all points, then increase the border
        // by an arbitrary distance. Any point around this box closest to only one point
        // indicates the area is infinite.

        let bounds = [[Infinity, Infinity], [0, 0]];
        points.forEach(point => {
            if (point[0] < bounds[0][0]) bounds[0][0] = point[0];
            if (point[1] < bounds[0][1]) bounds[0][1] = point[1];
            if (point[0] > bounds[1][0]) bounds[1][0] = point[0];
            if (point[1] > bounds[1][1]) bounds[1][1] = point[1];
        });
        bounds[0][0] -= 10;
        bounds[0][1] -= 10;
        bounds[1][1] += 10;
        bounds[1][1] += 10;

        // Part 1

        let danger = {};

        for (let x = bounds[0][0]; x <= bounds[1][0]; x++) {
            for (let y = bounds[0][1]; y <= bounds[1][1]; y++) {
                let closest = points.map((point, i) => [i, this.distance(point, [x, y])]).sort((a, b) => a[1] - b[1]);

                if (closest[0][1] === closest[1][1]) {
                    // tie
                } else {
                    danger[closest[0][0]] = danger[closest[0][0]] || { count: 0, infinite: false };
                    danger[closest[0][0]].count++;
                    if (x === bounds[0][0] || x === bounds[1][0] || y === bounds[0][1] || y === bounds[1][1]) {
                        danger[closest[0][0]].infinite = true;
                    }
                }
            }
        }

        console.log(danger);

        let answer = Object.values(danger).filter(x => !x.infinite).sort((a, b) => b.count - a.count)[0];
        console.log(answer);

        // Part 2
        let area = 0;

        for (let x = bounds[0][0]; x <= bounds[1][0]; x++) {
            for (let y = bounds[0][1]; y <= bounds[1][1]; y++) {
                let sum = 0;
                for (let i = 0; i < points.length; i++) {
                    sum += this.distance(points[i], [x, y]);
                    if (sum >= 10000) break;
                }
                if (sum < 10000) {
                    area++;
                }
            }
        }

        console.log('Total squares <10000 from every point: ' + area);
    }
}
module.exports = Day06;
