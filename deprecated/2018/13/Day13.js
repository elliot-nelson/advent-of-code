class Day13 {
    constructor(input) {
        this.input = input;
    }

    draw(lines, carts) {
        let output = lines.concat();
        carts.forEach(cart => {
            output[cart.y] = output[cart.y].substring(0, cart.x) + cart.facing + output[cart.y].substring(cart.x + 1);
        });
        console.log(output.join('\n'));
        console.log(carts);
    }

    run() {
        let carts = [];
        let cartDirections = [
            [0, -1],
            [1, 0],
            [0, 1],
            [-1, 0]
        ];
        let cartSymbols = {
            '^': [0, '|'],
            '>': [1, '-'],
            'v': [2, '|'],
            '<': [3, '-']
        };

        for (let y = 0; y < this.input.length; y++) {
            for (let x = 0; x < this.input[y].length; x++) {
                let cart = cartSymbols[this.input[y][x]];
                if (cart) {
                    carts.push({ x, y, facing: cart[0], pref: -1 });
                    this.input[y] = this.input[y].substring(0, x) + cart[1] + this.input[y].substring(x + 1);
                }
            }
        }

        this.draw(this.input, carts);

        let crashes = [];

        for (;;) {
            carts = carts.sort((a, b) => {
                let val = a.y - b.y;
                if (val === 0) val = a.x - b.x;
                return val;
            });
            for (let i = 0; i < carts.length; i++) {
                carts[i].x += cartDirections[carts[i].facing][0];
                carts[i].y += cartDirections[carts[i].facing][1];

                let track = this.input[carts[i].y][carts[i].x];
                if (track === '+') {
                    carts[i].facing = (carts[i].facing + carts[i].pref + 4) % 4;
                    carts[i].pref++;
                    if (carts[i].pref > 1) carts[i].pref = -1;
                } else if (track === '/' && carts[i].facing === 0) {
                    carts[i].facing = 1;
                } else if (track === '\\' && carts[i].facing === 1) {
                    carts[i].facing = 2;
                } else if (track === '/' && carts[i].facing === 2) {
                    carts[i].facing = 3;
                } else if (track === '\\' && carts[i].facing === 3) {
                    carts[i].facing = 0;
                } else if (track === '/' && carts[i].facing === 3) {
                    carts[i].facing = 2;
                } else if (track === '\\' && carts[i].facing === 2) {
                    carts[i].facing = 1;
                } else if (track === '/' && carts[i].facing === 1) {
                    carts[i].facing = 0;
                } else if (track === '\\' && carts[i].facing === 0) {
                    carts[i].facing = 3;
                }

                for (let j = 0; j < carts.length; j++) {
                    if (i !== j && carts[i].x === carts[j].x && carts[i].y === carts[j].y) {
                        crashes.push([carts[i].x, carts[i].y]);
                        console.log(crashes);

                        carts.splice(j, 1);
                        carts.splice(i, 1);
                        i--;
                        break;
                        // For Part 1, just throw after the first crash.
                        // throw new Error('Finished with Part 1');
                    }
                }

            }

            this.draw(this.input, carts);

            if (carts.length === 1) {
                // Part 2
                console.log(carts);
                break;
            }
        }
    }
}
module.exports = Day13;
