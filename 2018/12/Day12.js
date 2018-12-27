class Day12 {
    constructor(input) {
        this.input = input;
    }

    pad() {
        while (this.state[0] === '#' || this.state[1] === '#' || this.state[2] === '#') {
            this.state.unshift('.');
            this.offset--;
        }

        while (this.state[this.state.length - 1] === '#' || this.state[this.state.length - 2] === '#' || this.state[this.state.length - 3] === '#') {
            this.state.push('.');
        }
    }

    update() {
        let nextState = [];

        this.pad();

        nextState.push('.');
        nextState.push('.');
        for (let i = 2; i < this.state.length - 2; i++) {
            let plants = this.state.slice(i - 2, i + 3).join('');
            let output = this.rules[plants];
            if (!output) output = '.';
            nextState.push(output);
        }
        nextState.push('.');
        nextState.push('.');

        this.state = nextState;
    }

    plantValue() {
        let value = 0;
        for (let i = 0; i < this.state.length; i++) {
            if (this.state[i] === '#') {
                value += (i + this.offset);
            }
        }
        return value;
    }

    run() {
        this.state = this.input.shift().split(': ')[1].split('');
        this.offset = 0;
        this.input.shift();

        this.rules = {};
        this.input.forEach(line => {
            let split = line.split(' => ');
            this.rules[split[0]] = split[1];
        });

        console.log(this.state.join(''));

        // Part 1

        for (let i = 0; i < 20; i++) {
            this.update();
            console.log([i + 1, this.state.length, this.plantValue()]);
        }

        console.log('Value: ' + this.plantValue());
        console.log('-------------------------');

        // Run until you find a pattern... In the case of MY input, we reach
        // a state where every generation adds 62 plants.
        for (let i = 20; i < 50000000000; i++) {
            this.update();
            console.log([i + 1, this.state.length, this.plantValue()]);
        }

        console.log('Value: ' + this.plantValue());
    }
}
module.exports = Day12;
