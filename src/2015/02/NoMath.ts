// Year 2015 Day 02
// I Was Told There Would Be No Math

import { ISolution } from '../../util';

function squareFeet(dimensions: number[]): number {
    let sides: number[] = [
        dimensions[0] * dimensions[1],
        dimensions[0] * dimensions[2],
        dimensions[1] * dimensions[2]
    ];

    return 2 * sides[0] + 2 * sides[1] + 2 * sides[2] + Math.min(...sides);
}

function ribbonLength(dimensions: number[]): number {
    dimensions.sort((a, b) => a - b);

    return 2 * (dimensions[0] + dimensions[1]) + dimensions[0] * dimensions[1] * dimensions[2];
}

export function solve(input: string[]): ISolution<number> {
    const presents = input.map(line => line.split('x').map(Number));

    // Part 1
    const part1: number = presents.map(squareFeet).reduce((sum, value) => sum + value, 0);

    // Part 2
    const part2: number = presents.map(ribbonLength).reduce((sum, value) => sum + value, 0);

    return { part1, part2 };
}
