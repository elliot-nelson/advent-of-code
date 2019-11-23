// This was actually my first draft, which solved the puzzle but is quite slow.
// See Day05 for just a basic for loop scan, which is 10x faster than this fun
// but very impractical regex solution.
class Day05 {
    constructor(input) {
        this.input = input;
    }

    run() {
        this.input = this.input[0];

        let catalyst = [];
        for (let i = 97; i <= 122; i++) {
            let letter = String.fromCharCode(i);
            catalyst.push(letter + letter.toUpperCase());
            catalyst.push(letter.toUpperCase() + letter);
        }

        // Part 1

        let regex = new RegExp(catalyst.join('|'));
        let match;
        let polymer = this.input;

        while ((match = polymer.match(regex))) {
            polymer = polymer.substring(0, match.index) + polymer.substring(match.index + 2);
        }

        console.log(polymer.length);

        // Part 2

        let polymers = {};
        for (let i = 97; i <= 122; i++) {
            let letter = String.fromCharCode(i);
            console.log('Analyzing ' + letter + '...');

            let removalRegex = new RegExp([letter, letter.toUpperCase()].join('|'), 'g');
            let sample = this.input.replace(removalRegex, '');

            while ((match = sample.match(regex))) {
                sample = sample.substring(0, match.index) + sample.substring(match.index + 2);
            }

            polymers[letter] = sample.length;
        }

        console.log(polymers);

        let answer = Object.keys(polymers).sort((a, b) => polymers[a] - polymers[b])[0];
        console.log('Answer: ' + answer + '=' + polymers[answer]);
    }
}
module.exports = Day05;
