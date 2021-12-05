// Year 2015 Day 01
// Not Quite Lisp

import { ISolution } from '../../util';

export function solve(input: string[]): ISolution<number> {
    const instructions: string[] = input[0].split('');
    let floor: number = 0;
    let basementIndex: number = -1;

    for (let i = 0; i < instructions.length; i++) {
        floor += instructions[i] === '(' ? 1 : -1;
        if (floor < 0 && basementIndex < 0) basementIndex = i;
    }

    // Part 1
    const part1 = floor;

    // Part 2
    const part2 = basementIndex + 1;

    return { part1, part2 };
}
