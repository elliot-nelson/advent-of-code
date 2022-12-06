// Year 2022 Day 06
// Tuning Trouble

import { ISolution } from '../../util';

function uniqueSequenceIndex(str: string, markerLength: number): number {
    for (let i = markerLength; i < str.length; i++) {
        const x = new Set([...str.slice(i - markerLength, i)]);
        if (x.size === markerLength) return i;
    }
    return -1;
}

export function solve(input: string[]): ISolution<number> {
    // Part 1
    const part1 = uniqueSequenceIndex(input[0], 4);

    // Part 2
    const part2 = uniqueSequenceIndex(input[0], 14);

    return { part1, part2 };
}
