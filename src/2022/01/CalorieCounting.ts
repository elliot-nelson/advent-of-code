// Year 2022 Day 01
// Calorie Counting

import { ISolution } from '../../util';

export function solve(input: string[]): ISolution<number> {
    const calorieGroups: number[][] = input.join('\n').split('\n\n').map(group => group.split('\n').map(line => Number(line)));
    const totalCalories: number[] = calorieGroups.map(group => group.reduce((sum, value) => sum + value));

    // Part 1
    totalCalories.sort((a, b) => b - a);
    const part1 = totalCalories[0];

    // Part 2
    const part2 = totalCalories.slice(0, 3).reduce((sum, value) => sum + value);

    return { part1, part2 };
}
