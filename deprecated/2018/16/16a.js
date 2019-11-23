// Advent of Code 2018 Day xxa

module.exports = {
    possibleOpcodes(sample) {
        let possible = [];
        let { before, instr, after } = sample;

        if (after[instr[3]] === before[instr[1]] + before[instr[2]])   possible.push('addr');
        if (after[instr[3]] === before[instr[1]] + instr[2])           possible.push('addi');

        if (after[instr[3]] === before[instr[1]] * before[instr[2]])   possible.push('mulr');
        if (after[instr[3]] === before[instr[1]] * instr[2])           possible.push('muli');

        if (after[instr[3]] === (before[instr[1]] & before[instr[2]])) possible.push('banr');
        if (after[instr[3]] === (before[instr[1]] & instr[2]))         possible.push('bani');

        if (after[instr[3]] === (before[instr[1]] | before[instr[2]])) possible.push('borr');
        if (after[instr[3]] === (before[instr[1]] | instr[2]))         possible.push('bori');

        if (after[instr[3]] === before[instr[1]])                      possible.push('setr');
        if (after[instr[3]] === instr[1])                              possible.push('seti');

        if (after[instr[3]] === 1 && instr[1] > before[instr[2]])      possible.push('gtir');
        if (after[instr[3]] === 0 && instr[1] <= before[instr[2]])     possible.push('gtir');
        if (after[instr[3]] === 1 && before[instr[1]] > instr[2])      possible.push('gtri');
        if (after[instr[3]] === 0 && before[instr[1]] <= instr[2])     possible.push('gtri');
        if (after[instr[3]] === 1 && before[instr[1]] > before[instr[2]])  possible.push('gtrr');
        if (after[instr[3]] === 0 && before[instr[1]] <= before[instr[2]]) possible.push('gtrr');

        if (after[instr[3]] === 1 && instr[1] === before[instr[2]])    possible.push('eqir');
        if (after[instr[3]] === 0 && instr[1] !== before[instr[2]])    possible.push('eqir');
        if (after[instr[3]] === 1 && before[instr[1]] === instr[2])    possible.push('eqri');
        if (after[instr[3]] === 0 && before[instr[1]] !== instr[2])    possible.push('eqri');
        if (after[instr[3]] === 1 && before[instr[1]] === before[instr[2]]) possible.push('eqrr');
        if (after[instr[3]] === 0 && before[instr[1]] !== before[instr[2]]) possible.push('eqrr');

        return possible;
    },

    numberOverThree(samples) {
        let count = 0;
        samples.forEach(sample => {
            if (this.possibleOpcodes(sample).length >= 3) count++;
        });
        return count;
    },

    deduceOpcodes(samples) {
        let possible = [];
        let unique = {};

        // First pass: given every sample, make a list of all op codes and their
        // possible instructions (the intersection of the possible op codes for every
        // sample we've seen).
        samples.forEach(sample => {
            let opcodes = this.possibleOpcodes(sample);

            if (!possible[sample.instr[0]]) {
                possible[sample.instr[0]] = opcodes;
            } else {
                possible[sample.instr[0]] = possible[sample.instr[0]].filter(x => opcodes.indexOf(x) >= 0);
            }
        });

        for (;;) {
            for (let i = 0; i < possible.length; i++) {
                if (possible[i].length === 1) {
                    unique[possible[i]] = 1;
                } else {
                    possible[i] = possible[i].filter(x => !unique[x]);
                }
            }
            if (Object.keys(unique).length === possible.length) break;
        }

        return possible.map(x => x[0]);
    },

    run(input) {
        let match, regex = /Before: \[(\d+), (\d+), (\d+), (\d+)\]+\n(\d+) (\d+) (\d+) (\d+)\nAfter:  \[(\d+), (\d+), (\d+), (\d+)\]/g;
        let samples = [];
        input = input.join('\n');

        while (match = regex.exec(input)) {
            let arr = match.slice(1).map(x => parseInt(x, 10));
            samples.push({
                before: arr.slice(0, 4),
                instr: arr.slice(4, 8),
                after: arr.slice(8, 12)
            });
        }

        console.log(this.numberOverThree(samples));
        console.log(this.deduceOpcodes(samples));

        [ 'bani',
  'addr',
  'mulr',
  'addi',
  'gtri',
  'banr',
  'borr',
  'eqri',
  'seti',
  'eqrr',
  'bori',
  'setr',
  'eqir',
  'muli',
  'gtrr',
  'gtir' ]
    }
};

let lines = require('fs').readFileSync('input.txt', 'utf8').split('\n');
if (lines[lines.length-1] === '') lines.pop();
module.exports.run(lines);
