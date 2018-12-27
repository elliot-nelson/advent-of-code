class Day11 {
    constructor(input) {
        this.input = input;
        this.input = parseInt(input[0], 10);
        this.cache = {};
    }

    getPowerLevel(x, y) {
        let rackId = x + 10;
        let powerLevel = rackId * y;
        powerLevel += this.input;
        powerLevel *= rackId;
        powerLevel = Math.floor((powerLevel % 1000) / 100);
        return powerLevel - 5;
    }

    run() {
        let overallBest = { x: 0, y: 0, value: 0, size: 0 };
        let matrix = [];

        // Kinda skipped Part 1 here...
        // But, just replace size 1->300 with size 3->3 to get Part 1's answer.

        for (let y = 1; y <= 300; y++) {
            for (let x = 1; x <= 300; x++) {
                let value = 0;
                let best = { value: 0, size: 0 };
                let maxSize = 301 - Math.max(x, y);
                for (let size = 1; size <= maxSize; size++) {
                    for (let k = 0; k < size; k++) value += this.getPowerLevel(x + k, y + size - 1);
                    for (let k = 0; k < size - 1; k++) value += this.getPowerLevel(x + size - 1, y + k);

                    matrix[y] = matrix[y] || [];
                    matrix[y][x] = matrix[y][x] || [];
                    matrix[y][x][size] = value;

                    if (value > best.value) {
                        best.value = value;
                        best.size = size;
                    }
                }
                matrix[y][x].best = best;
                console.log([x,y,best]);

                if (best.value > overallBest.value) {
                    overallBest.x = x;
                    overallBest.y = y;
                    overallBest.value = best.value;
                    overallBest.size = best.size;
                }
            }
        }

        console.log(overallBest);
    }
}
module.exports = Day11;
