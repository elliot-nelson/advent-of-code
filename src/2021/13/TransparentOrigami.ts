// Year 2021 Day 13
// Transparent Origami

import { ISolution } from '../../util';

type Instruction = {
    axis: string;
    value: number;
}

function fold(dots: number[][], instr: Instruction) {
    const index = instr.axis === 'x' ? 0 : 1;

    for (const dot of dots) {
        if (dot[index] > instr.value) dot[index] = instr.value - (dot[index] - instr.value);
    }
}

function countUnique(dots: number[][]): number {
    const hash: Record<string, boolean> = dots.reduce((hash, dot) => {
        hash[String(dot)] = true;
        return hash;
    }, {});
    return Object.keys(hash).length;
}

function format(dots: number[][]): string {
    const output: string[][] = [];
    for (const dot of dots) {
        output[dot[1]] = output[dot[1]] || [];
        output[dot[1]][dot[0]] = '#';
    }
    return [...output].map(line => [...line].map(char => char || ' ').join('')).join('\n');
}

export function solve(input: string[]): ISolution<string> {
    const sections: string[] = input.join('\n').split('\n\n');
    const dots: number[][] = sections[0].split('\n').map(line => line.split(',').map(Number));
    const instructions: Instruction[] = sections[1].split('\n').map(str => {
        const elem = str.split(' ').slice(-1)[0].split('=');
        return { axis: elem[0], value: Number(elem[1]) };
    });

    // Part 1
    fold(dots, instructions[0]);
    const part1: string = String(countUnique(dots));

    // Part 2
    for (const instr of instructions.slice(1)) fold(dots, instr);
    const part2: string = format(dots);

    return { part1, part2 };
}
