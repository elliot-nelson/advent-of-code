// Year 2022 Day 04
// Camp Cleanup

import { ISolution } from '../../util';

function fullOverlap(a: number[], b: number[]): boolean {
    if (a[0] >= b[0] && a[1] <= b[1]) {
        return true;
    }
    if (b[0] >= a[0] && b[1] <= a[1]) {
        return true;
    }
    return false;
}

function overlap(a: number[], b: number[]): boolean {
    if (a[1] < b[0]) return false;
    if (a[0] > b[1]) return false;
    if (b[1] < a[0]) return false;
    if (b[0] > a[1]) return false;
    return true;
}

export function solve(input: string[]): ISolution<number> {
    const pairs: number[][][] = input.map(line => line.split(',').map(range => range.split('-').map(value => Number(value))));

    // Part 1
    const part1 = pairs.filter(p => fullOverlap(p[0], p[1])).length;

    // Part 2
    const part2 = pairs.filter(p => overlap(p[0], p[1])).length;

    return { part1, part2 };
}
