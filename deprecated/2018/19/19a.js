// Advent of Code 2018 Day xxa

const util = require('util');

module.exports = {
    execute(instr, registers) {
        switch(instr[0]) {
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
        let registers = [0, 0, 0, 0, 0, 0];

        let ip = input.shift();
        let ipRegister = parseInt(ip.match(/#ip (\d+)/)[1], 10);

        let pointer = 0;

        // Part 2
        registers[0] = 1;

        for (;;) {
            if (pointer < 0 || pointer >= input.length) {
                break;
            }

            let instr = input[pointer].split(' ');
            instr[1] = parseInt(instr[1], 10);
            instr[2] = parseInt(instr[2], 10);
            instr[3] = parseInt(instr[3], 10);

            //[ 9, [ 'gtrr', 1, 2, 3 ], [ 1, 190, 977, 0, 279, 9 ] ] -> [ 1, 190, 977, 0, 279, 9 ]
            if (pointer === 9 && registers[1] < 970) {
                registers[1] = 970;
            }
            if (pointer === 9 && registers[1] < 10551376) {
                registers[1] = 10551376;
            }

            //[ 13,
            //    [ 'gtrr', 4, 2, 3 ],
            //    [ 1, 10551378, 10551377, 1, 5488, 13 ] ] -> [ 1, 10551378, 10551377, 0, 5488, 13 ]
            if (pointer === 3 && registers[4] < 10551365) {
                registers[4] = 10551365;
            }

            registers[ipRegister] = pointer;
            let line = util.inspect([pointer, instr, registers]);
            this.execute(instr, registers);
            pointer = registers[ipRegister];
            pointer++;

            line += ' -> ' + util.inspect(registers);
            console.log(line);
        }
    }
};

let lines = require('fs').readFileSync('input.txt', 'utf8').split('\n');
if (lines[lines.length-1] === '') lines.pop();
module.exports.run(lines);
