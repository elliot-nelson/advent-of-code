// Year 2021 Day 15
// Chiton

import { ISolution } from '../../util';

function lowestRiskPath(grid: number[][]): number {
    let bestCost: number[][] = grid.map(row => row.map(value => Infinity));
    let edgeX: number = 1;
    let edgeY: number = 1;

    bestCost[0][0] = 0;

    for (;;) {
        let betterCostFound: boolean = false;

        let edges: number[][] = [];
        for (let x = 0; x <= edgeX; x++) {
            edges.push([x, edgeY]);
        }
        for (let y = 0; y <= edgeY; y++) {
            edges.push([edgeX, y]);
        }

        for (let [x, y] of edges) {
            let possible: number[] = [
                bestCost[y]?.[x - 1] + grid[y][x],
                bestCost[y]?.[x + 1] + grid[y][x],
                bestCost[y - 1]?.[x] + grid[y][x],
                bestCost[y + 1]?.[x] + grid[y][x]
            ];
            let cost = Math.min(...possible.filter(num => num));
            if (cost < bestCost[y][x]) {
                bestCost[y][x] = cost;
                betterCostFound = true;
            }
        }

        if (!betterCostFound) {
            if (edgeX === grid[0].length - 1 && edgeY === grid.length - 1) break;
            edgeX = Math.min(edgeX + 1, grid[0].length - 1);
            edgeY = Math.min(edgeY + 1, grid[0].length - 1);
        } else {
            if (edgeX > 1) edgeX--;
            if (edgeY > 1) edgeY--;
        }
    }

    return bestCost[bestCost.length - 1][bestCost[0].length - 1];
}

function buildFullMap(input: number[][]) {
    const output: number[][] = [];

    for (let t = 0; t < 5; t++) {
        for (let s = 0; s < 5; s++) {
            for (let y = 0; y < input.length; y++) {
                output[t * input.length + y] = (output[t * input.length + y] || []);
                for (let x = 0; x < input[0].length; x++) {
                    output[t * input.length + y][s * input[0].length + x] = (input[y][x] + s + t - 1) % 9 + 1;
                }
            }
        }
    }

    return output;
}

export function solve(input: string[]): ISolution<number> {
    const grid: number[][] = input.map(line => line.split('').map(Number));

    // Part 1
    const part1 = lowestRiskPath(grid);

    // Part 2
    const part2 = lowestRiskPath(buildFullMap(grid));

    return { part1, part2 };
}
