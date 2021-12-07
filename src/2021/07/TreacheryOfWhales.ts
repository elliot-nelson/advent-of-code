// Year 2021 Day 07
// The Treachery Of Whales

import { ISolution } from '../../util';

function fuelCostPart1(x1: number, x2: number): number {
    return Math.abs(x1 - x2);
}

function fuelCostPart2(x1: number, x2: number): number {
    let diff: number = Math.abs(x1 - x2);
    return diff * (diff + 1) / 2;
}

function bestFuelCost(crabs: number[], fuelFn: (x1: number, x2: number) => number): number {
    const costs: number[] = [];
    let lowestIdx: number = 0;

    for (let i = 0; i < Math.max(...crabs); i++) {
        costs[i] = crabs.reduce((sum, value) => sum + fuelFn(value, i), 0);
        if (costs[i] < costs[lowestIdx]) lowestIdx = i;
    }

    return costs[lowestIdx];
}

export function solve(input: string[]): ISolution<number> {
    const crabs = input[0].split(',').map(Number);

    // Part 1
    const part1 = bestFuelCost(crabs, fuelCostPart1);

    // Part 2
    const part2 = bestFuelCost(crabs, fuelCostPart2);

    return { part1, part2 };
}
