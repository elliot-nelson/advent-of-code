// Year 2021 Day 01
// Sonar Sweep

import { ISolution } from '../../util';

export function solve(input: string[]): ISolution {
    const depths: number[] = input.map(line => parseInt(line, 10));

    // Part 1
    let count: number = depths.reduce((count, entry, idx) => {
        return count + (entry > depths[idx - 1] ? 1 : 0);
    }, 0);

    const part1: number = count;

    // Part 2
    count = 0;
    for (let i = 1; i < input.length - 2; i++) {
        let a = depths[i - 1] + depths[i] + depths[i + 1]
        let b = a - depths[i - 1] + depths[i + 2];

        if (b > a) count++;
    }

    const part2: number = count;

    return {
        part1: [String(part1)],
        part2: [String(part2)]
    };
}
