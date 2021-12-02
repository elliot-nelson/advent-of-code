// Year 2021 Day 02
// Dive!

import { ISolution } from '../../util';

interface Command {
    dir: string;
    units: number;
}

function simulateModel1(commands: Command[]): number {
    let position = 0, depth = 0;

    for (let command of commands) {
        switch (command.dir) {
            case 'forward':
                position += command.units;
                break;
            case 'down':
                depth += command.units;
                break;
            case 'up':
                depth -= command.units;
                break;
        }
    }

    return position * depth;
}

function simulateModel2(commands: Command[]): number {
    let position = 0, depth = 0, aim = 0;

    for (let command of commands) {
        switch (command.dir) {
            case 'forward':
                position += command.units;
                depth += command.units * aim;
                break;
            case 'down':
                aim += command.units;
                break;
            case 'up':
                aim -= command.units;
                break;
        }
    }

    return position * depth;
}

export function solve(input: string[]): ISolution<number> {
    const commands: Command[] = input.map(line => {
        let elem = line.split(' ');
        return { dir: elem[0], units: Number(elem[1]) };
    });

    // Part 1
    const part1 = simulateModel1(commands);

    // Part 2
    const part2 = simulateModel2(commands);

    return { part1, part2 };
}
