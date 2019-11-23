// Advent of Code 2018 Day xxa

module.exports = {
    execute(instr, registers) {
        let opcodes = [ 'bani',
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
            'gtir'
        ];
        let op = opcodes[instr[0]];

        switch(op) {
            case 'addr':
                registers[instr[3]] = registers[instr[1]] + registers[instr[2]];
                break;
            case 'addi':
                registers[instr[3]] = registers[instr[1]] + instr[2];
                break;
            case 'mulr':
                registers[instr[3]] = registers[instr[1]] * registers[instr[2]];
                break;
            case 'muli':
                registers[instr[3]] = registers[instr[1]] * instr[2];
                break;
            case 'banr':
                registers[instr[3]] = (registers[instr[1]] & registers[instr[2]]);
                break;
            case 'bani':
                registers[instr[3]] = (registers[instr[1]] & instr[2]);
                break;
            case 'borr':
                registers[instr[3]] = (registers[instr[1]] | registers[instr[2]]);
                break;
            case 'bori':
                registers[instr[3]] = (registers[instr[1]] | instr[2]);
                break;
            case 'setr':
                registers[instr[3]] = registers[instr[1]];
                break;
            case 'seti':
                registers[instr[3]] = instr[1];
                break;
            case 'gtir':
                registers[instr[3]] = instr[1] > registers[instr[2]] ? 1 : 0;
                break;
            case 'gtri':
                registers[instr[3]] = registers[instr[1]] > instr[2] ? 1 : 0;
                break;
            case 'gtrr':
                registers[instr[3]] = registers[instr[1]] > registers[instr[2]] ? 1 : 0;
                break;
            case 'eqir':
                registers[instr[3]] = instr[1] === registers[instr[2]] ? 1 : 0;
                break;
            case 'eqri':
                registers[instr[3]] = registers[instr[1]] === instr[2] ? 1 : 0;
                break;
            case 'eqrr':
                registers[instr[3]] = registers[instr[1]] === registers[instr[2]] ? 1 : 0;
                break;
        }
    },

    run(input) {
        let registers = [0, 0, 0, 0];

        for (let i = 0; i < lines.length; i++) {
            let instr = lines[i].split(' ').map(x => parseInt(x, 10));

            this.execute(instr, registers);
            console.log([instr, registers]);
        }
    }
};

let lines = require('fs').readFileSync('input2.txt', 'utf8').split('\n');
if (lines[lines.length-1] === '') lines.pop();
module.exports.run(lines);
