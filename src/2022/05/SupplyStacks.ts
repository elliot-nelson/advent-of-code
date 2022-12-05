// Year 2022 Day 05
// Supply Stacks

import { ISolution } from '../../util';

interface Instruction {
    count: number;
    from: number;
    to: number;
}

type CraneModel = 'CrateMover 9000' | 'CrateMover 9001';

function parseCrates(input: string): string[][] {
    const lines = input.split('\n');
    const crates: string[][] = [];

    for (let i = 0; i < 9; i++) {
        const digit = lines[lines.length - 1][i * 4 + 1];
        if (digit && digit.match(/\d/)) {
            crates[i] = [];

            for (let j = 0; j < lines.length - 1; j++) {
                const value = lines[j][i * 4 + 1];
                if (value && value !== ' ') {
                    crates[i].push(value);
                }
            }
        } else {
            break;
        }
    }

    return crates;
}

function parseInstructions(input: string): Instruction[] {
    return input.split('\n').map(line => {
        const match = line.match(/move (\d+) from (\d+) to (\d+)/)!;
        return {
            count: Number(match[1]),
            from: Number(match[2]),
            to: Number(match[3])
        };
    });
}

function move(crates: string[][], ins: Instruction, model: CraneModel) {
    if (model === 'CrateMover 9000') {
        for (let i = 0; i < ins.count; i++) {
            const value: string = crates[ins.from - 1].shift()!;
            crates[ins.to - 1].unshift(value);
        }
    } else {
        const values: string[] = [];
        for (let i = 0; i < ins.count; i++) {
            values.push(crates[ins.from - 1].shift()!);
        }

        for (let i = 0; i < ins.count; i++) {
            crates[ins.to - 1].unshift(values.pop()!);
        }
    }
}

export function solve(input: string[]): ISolution<string> {
    const sections: string[] = input.join('\n').split('\n\n');
    const instructions: Instruction[] = parseInstructions(sections[1]);

    // Part 1
    let crates: string[][] = parseCrates(sections[0]);
    for (const instruction of instructions) {
        move(crates, instruction, 'CrateMover 9000');
    }
    const part1: string = crates.map(values => values[0]).join('');

    // Part 2
    crates = parseCrates(sections[0]);
    for (const instruction of instructions) {
        move(crates, instruction, 'CrateMover 9001');
    }
    const part2: string = crates.map(values => values[0]).join('');

    return { part1, part2 };
}
