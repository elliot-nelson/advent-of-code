// Year 2015 Day 03
// Perfectly Spherical Houses in a Vacuum

import { ISolution } from '../../util';

function housesVisited(directions: string[], santas: number): number {
    const positions: number[][] = [...Array(santas)].map(x => [0, 0]);
    const houses: Record<string, number> = {};
    let santaIndex: number = 0;

    houses[String(positions[santaIndex])] = (houses[String(positions[santaIndex])] || 0) + 1;

    for (let dir of directions) {
        switch (dir) {
            case '<': positions[santaIndex][0]--; break;
            case '>': positions[santaIndex][0]++; break;
            case '^': positions[santaIndex][1]--; break;
            case 'v': positions[santaIndex][1]++; break;
        }

        houses[String(positions[santaIndex])] = (houses[String(positions[santaIndex])] || 0) + 1;

        santaIndex = (santaIndex + 1) % santas;
    }

    return Object.keys(houses).length;
}


export function solve(input: string[]): ISolution<number> {
    const directions = input[0].split('');

    // Part 1
    const part1: number = housesVisited(directions, 1);

    // Part 2
    const part2: number = housesVisited(directions, 2);

    return { part1, part2 };
}
