// Year 2021 Day 06
// Lanternfish

import { ISolution } from '../../util';

function simulateFishGrowth(fish: number[], days: number): number {
    const ageCount: Record<number, number> = fish.reduce((hash, age) => {
        hash[age] = (hash[age] || 0) + 1;
        return hash;
    }, {});

    for (let day = 0; day < days; day++) {
        let newFish: number = ageCount[0] || 0;

        for (let i = 0; i < 8; i++) {
            ageCount[i] = ageCount[i + 1] || 0;
        }

        ageCount[6] += newFish;
        ageCount[8] = newFish;
    }

    return Object.keys(ageCount).reduce((sum, age) => sum + ageCount[age], 0);
}

export function solve(input: string[]): ISolution<number> {
    const fish: number[] = input[0].split(',').map(Number);

    // Part 1
    const part1 = simulateFishGrowth(fish, 80);

    // Part 2
    const part2 = simulateFishGrowth(fish, 256);

    return { part1, part2 };
}
