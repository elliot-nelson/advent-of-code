class Day10 {
    constructor(input) {
        this.input = input;
    }

    update() {
        this.points.forEach(point => {
            point.x += point.vx;
            point.y += point.vy;
        });
        this.elapsed++;
    }

    render() {
        let output = [];
        let bounds = [Infinity, Infinity, 0, 0];

        this.points.forEach(point => {
            if (!output[point.y]) output[point.y] = [];
            output[point.y][point.x] = '#';
            if (point.x < bounds[0]) bounds[0] = point.x;
            if (point.y < bounds[1]) bounds[1] = point.y;
            if (point.x > bounds[2]) bounds[2] = point.x;
            if (point.y > bounds[3]) bounds[3] = point.y;
        });

        let w = bounds[2] - bounds[0], h = bounds[3] - bounds[1];

        if (h === 9) {
            for (let y = 0; y <= h; y++) {
                let line = '';
                for (let x = 0; x <= w; x++) {
                    line += (output[bounds[1] + y] || [])[bounds[0] + x] ? '#' : '.';
                }
                console.log(line);
            }
            console.log([w,h,this.elapsed]);
            throw new Error('Done');
        }
    }

    run() {
        this.points = this.input.map(line => {
            let match = line.match(/position=< *(-?\d+), *(-?\d+)> velocity=< *(-?\d+), *(-?\d+)>/).map(x => parseInt(x, 10));
            return {
                x: match[1],
                y: match[2],
                vx: match[3],
                vy: match[4]
            };
        });

        this.elapsed = 0;
        this.render();
        for (;;) {
            this.update();
            this.render();
        }
    }
}
module.exports = Day10;
