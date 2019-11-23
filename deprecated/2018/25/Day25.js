class Day25 {
    constructor(input) {
        this.input = input;
    }

    distance(a, b) {
        return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) + Math.abs(a[3] - b[3]);
    }

    collapse(constellations) {
        console.log(constellations.length);
        for (let i = 0; i < constellations.length; i++) {
            console.log("check " + i + " " + constellations.length);
            let a = constellations[i];
            for (let j = 0; j < a.length; j++) {
                for (let k = i + 1; k < constellations.length; k++) {
                    let connected = false;

                    for (let l = 0; l < constellations[k].length; l++) {
                        if (this.distance(constellations[i][j], constellations[k][l]) <= 3) {

                            console.log(["chain", constellations[i][j], constellations[k][l],
                            this.distance(constellations[i][j], constellations[k][l])]);
                            connected = true;
                            break;
                        }
                    }

                    if (connected) {
                        constellations[i] = constellations[i].concat(constellations[k]);
                        constellations.splice(k, 1);
                        //k--;
                        k = constellations.length;
                        j = constellations[i].length;
                        i--;
                    }
                }
            }
        }
    }

    run() {
        let points = this.input.map(line => line.split(',').map(x => parseInt(x, 10)));
        let constellations = points.map(point => [point]);

        // Part 1

        this.collapse(constellations);
        console.log(constellations);
        console.log(constellations.length);
    }
}
module.exports = Day25;
