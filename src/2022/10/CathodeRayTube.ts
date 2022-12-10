// Year 2022 Day 10
// Cathode-Ray Tube

import { ISolution } from '../../util';

interface Instruction {
    i: string;
    val: number;
}

interface Result {
    cycle: number;
    x: number;
}

function simulate(instructions: Instruction[]): Result[] {
    let x: number = 1;
    let cycle: number = 0;
    let nextInstruction: number = 1;
    const results: Result[] = [];
    const pendingValues: Record<string, number> = {};

    while (instructions.length > 0) {
        cycle++;
        nextInstruction--;

        if (pendingValues[cycle]) {
            x += pendingValues[cycle];
        }

        results.push({ cycle, x });

        if (nextInstruction <= 0) {
            const instr = instructions.shift()!;

            switch (instr.i) {
                case 'noop':
                    nextInstruction = 1;
                    break;
                case 'addx':
                    nextInstruction = 2;
                    pendingValues[cycle + 2] = instr.val;
                    break;
            }
        }
    }

    return results;
}

export function solve(input: string[]): ISolution<string> {
    const instructions: Instruction[] = input.map(line => {
        const a = line.split(' ');
        return {
            i: a[0],
            val: Number(a[1])
        };
    });

    const results: Result[] = simulate(instructions);

    // Part 1
    const part1 = results
        .filter(result => result.cycle === 20 || (result.cycle - 20) % 40 === 0)
        .map(result => result.cycle * result.x)
        .reduce((sum, value) => sum + value).toString();

    // Part 2
    const output: string[][] = Array(6).fill(undefined).map(x => '.'.repeat(40).split(''));
    for (const result of results) {
        const yval = Math.floor(((result.cycle - 1) % 240) / 40);
        const xval = (result.cycle - 1) % 40;
        if (result.x >= xval - 1 && result.x <= xval + 1) {
            output[yval][xval] = '#';
        }
    }
    const part2 = output.map(line => line.join('')).join('\n');

    return { part1, part2 };
}
