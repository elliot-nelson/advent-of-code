// Year 2021 Day 09
// Smoke Basin

import { ISolution } from '../../util';

type Location = {
    x: number;
    y: number;
}

function basinSize(low: Location, heightmap: number[][]): number {
    const stack: Location[] = [low];
    const visited: Record<string, boolean> = {};

    let size: number = 0;

    // Standard flood fill (aka breadth-first search skipping visited nodes)
    while (stack.length > 0) {
        let pos: Location = stack.pop()!;
        if (heightmap[pos.y][pos.x] === 9 || visited[`${pos.x},${pos.y}`]) continue;
        visited[`${pos.x},${pos.y}`] = true;
        size++;

        if (pos.y > 0)
            stack.push({ x: pos.x, y: pos.y - 1 });
        if (pos.y < heightmap.length - 1)
            stack.push({ x: pos.x, y: pos.y + 1 });
        if (pos.x > 0)
            stack.push({ x: pos.x - 1, y: pos.y });
        if (pos.x < heightmap[0].length - 1)
            stack.push({ x: pos.x + 1, y: pos.y });
    }

    return size;
}

export function solve(input: string[]): ISolution<number> {
    const heightmap: number[][] = input.map(line => line.split('').map(Number));
    const lows: Location[] = [];

    for (let y = 0; y < heightmap.length; y++) {
        for (let x = 0; x < heightmap[0].length; x++) {
            const value = heightmap[y][x];
            const up = y > 0 ? heightmap[y - 1][x] : Infinity;
            const down = y < heightmap.length - 1 ? heightmap[y + 1][x] : Infinity;
            const left = x > 0 ? heightmap[y][x - 1] : Infinity;
            const right = x < heightmap[0].length - 1 ? heightmap[y][x + 1] : Infinity;

            if (value < up && value < down && value < left && value < right) {
                lows.push({ x, y });
            }
        }
    }

    // Part 1
    const part1: number = lows
        .map(low => heightmap[low.y][low.x] + 1)
        .reduce((sum, value) => sum + value, 0);

    // Part 2
    const part2: number = lows
        .map(low => basinSize(low, heightmap))
        .sort((a, b) => a - b).slice(-3)
        .reduce((product, value) => product * value, 1);

    return { part1, part2 };
}
