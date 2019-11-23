class Day05 {
    constructor(input) {
        this.input = input;
    }

    react(sample) {
        // a-z = 97-122
        for (let i = 0; i < sample.length; i++) {
            let a = sample.charCodeAt(i), b = sample.charCodeAt(i + 1);
            if (a >= 97 && a <= 122 && a - 32 === b || b >= 97 && b <= 122 && b - 32 === a) {
                sample = sample.substring(0, i) + sample.substring(i + 2);
                i = Math.max(i - 2, -1);
            }
        }
        return sample;
    }

    run() {
        this.input = this.input[0];

        // Part 1

        let polymer = this.react(this.input);
        console.log(polymer.length);

        // Part 2

        let polymers = {};
        for (let i = 97; i <= 122; i++) {
            let letter = String.fromCharCode(i);
            console.log('Analyzing ' + letter + '...');

            let removalRegex = new RegExp([letter, letter.toUpperCase()].join('|'), 'g');
            let sample = this.input.replace(removalRegex, '');
            sample = this.react(sample);
            polymers[letter] = sample.length;
        }

        console.log(polymers);

        let answer = Object.keys(polymers).sort((a, b) => polymers[a] - polymers[b])[0];
        console.log('Answer: ' + answer + '=' + polymers[answer]);
    }
}
module.exports = Day05;
