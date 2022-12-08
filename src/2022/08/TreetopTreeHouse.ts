// Year 2022 Day 08
// Treetop Tree House

import { ISolution } from '../../util';

function treeIsVisible(grid: number[][], x: number, y: number): boolean {
    if (y === 0 || x === 0 || x === grid[0].length - 1 || y === grid.length - 1) return true;

    let flag: boolean = true;
    for (let i = 0; i < x; i++) {
        if (grid[y][i] >= grid[y][x]) {
            flag = false;
            break;
        }
    }
    if (flag) return true;

    flag = true;
    for (let i = x + 1; i < grid[0].length; i++) {
        if (grid[y][i] >= grid[y][x]) {
            flag = false;
            break;
        }
    }
    if (flag) return true;

    flag = true;
    for (let i = 0; i < y; i++) {
        if (grid[i][x] >= grid[y][x]) {
            flag = false;
            break;
        }
    }
    if (flag) return true;

    flag = true;
    for (let i = y+1; i < grid.length; i++) {
        if (grid[i][x] >= grid[y][x]) {
            flag = false;
            break;
        }
    }
    if (flag) return true;

    return false;
}


function treeScore(grid: number[][], x: number, y: number): number {
    let visibleTrees: number[] = [0, 0, 0, 0];

    for (let i = x - 1; i >= 0; i--) {
        visibleTrees[0]++;
        if (grid[y][i] >= grid[y][x]) break;
    }

    for (let i = x + 1; i < grid[0].length; i++) {
        visibleTrees[1]++;
        if (grid[y][i] >= grid[y][x]) break;
    }

    for (let i = y - 1; i >= 0; i--) {
        visibleTrees[2]++;
        if (grid[i][x] >= grid[y][x]) break;
    }

    for (let i = y + 1; i < grid.length; i++) {
        visibleTrees[3]++;
        if (grid[i][x] >= grid[y][x]) break;
    }

    return visibleTrees[0] * visibleTrees[1] * visibleTrees[2] * visibleTrees[3];
}

function countVisibleTrees(grid: number[][]): number {
    let visible: number = 0;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (treeIsVisible(grid, x, y)) visible++;
        }
    }

    return visible;
}

function bestTreeScore(grid: number[][]): number {
    let bestScore: number = 0;

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            const score: number = treeScore(grid, x, y);
            if (score > bestScore) bestScore = score;
        }
    }

    return bestScore;
}

export function solve(input: string[]): ISolution<number> {
    const grid = input.map(line => line.split('').map(x => Number(x)));

    // Part 1
    const part1 = countVisibleTrees(grid);

    // Part 2
    const part2 = bestTreeScore(grid);

    return { part1, part2 };
}
