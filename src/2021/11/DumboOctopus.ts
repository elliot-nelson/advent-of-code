// Year 2021 Day 11
// Dumbo Octopus

import { ISolution } from '../../util';

function flash(grid: number[][], x, y) {
    for (let ty = y - 1; ty <= y + 1; ty++) {
        for (let tx = x - 1; tx <= x + 1; tx++) {
            if (tx >= 0 && ty >= 0 && tx < grid[0].length && ty < grid.length) grid[ty][tx]++;
        }
    }
    grid[y][x] = -Infinity;
}

function step(grid: number[][]) {
    let totalFlashes: number = 0;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            grid[y][x]++;
        }
    }

    for (;;) {
        const xyToFlash: number[][] = [];

        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[0].length; x++) {
                if (grid[y][x] > 9) xyToFlash.push([x, y]);
            }
        }

        if (xyToFlash.length === 0) break;

        for (let xy of xyToFlash) {
            totalFlashes++;
            flash(grid, xy[0], xy[1]);
        }
    }

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] < 0) grid[y][x] = 0;
        }
    }

    return totalFlashes;
}

export function solve(input: string[]): ISolution<number> {
    let grid: number[][] = input.map(line => line.split('').map(Number));

    let hundredthStepFlashes: number = 0;
    let steps: number = 0;

    for (;;) {
        let flashes: number = step(grid);
        steps++;

        if (steps <= 100) hundredthStepFlashes += flashes;
        if (flashes === 100) break;
    }

    // Part 1
    const part1 = hundredthStepFlashes;

    // Part 2
    const part2 = steps;

    return { part1, part2 };
}
