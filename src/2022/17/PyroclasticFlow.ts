// Year 2022 Day 17
// Pyroclastic Flow

import { ISolution } from '../../util';

const ROCKS: string[][] = [
    [
        '####'
    ],
    [
        '.#.',
        '###',
        '.#.'
    ],
    [
        '..#',
        '..#',
        '###'
    ],
    [
        '#',
        '#',
        '#',
        '#'
    ],
    [
        '##',
        '##'
    ]
];

interface Result {
    history: number[];
    grid: string[][];
}

function collide(grid: string[][], shape: string[], x: number, y: number): boolean {
    if (x < 0) return true;
    if (x + shape[0].length > 7) return true;
    if (y - shape.length + 1 < 0) return true;

    for (let v = 0; v < shape.length; v++) {
        for (let u = 0; u < shape[0].length; u++) {
            if (shape[v][u] === '#' && grid[y - v]?.[x + u] === '#') return true;
        }
    }

    return false;
}

function place(grid: string[][], shape: string[], x: number, y: number) {
    for (let v = 0; v < shape.length; v++) {
        for (let u = 0; u < shape[0].length; u++) {
            if (shape[v][u] === '#') {
                if (!grid[y - v]) grid[y - v] = ['.','.','.','.','.','.','.'];
                if (grid[y - v][x + u] !== '.') throw new Error(JSON.stringify([grid[y - v][x + u], shape, x, y, u, v, grid]));
                grid[y - v][x + u] = '#';
            }
        }
    }
}

function simulate(jetWinds: string): Result {
    let nextRock = 0;
    let nextJet = 0;
    let tallestY = -1;
    let grid: string[][] = [];

    const history: number[] = [];

    for (let rock = 0; rock < 2022 * 10; rock++) {
        let shape = ROCKS[nextRock];
        nextRock = (nextRock+1) % ROCKS.length;

        let rockX = 2;
        let rockY = shape.length + 3 + tallestY;

        for (let i = 0; i < 300; i++) {
            let dir = jetWinds[nextJet]; nextJet = (nextJet+1) % jetWinds.length;
            let dx = (dir === '>' ? 1 : -1);
            if (dir !== '>' && dir !== '<') throw new Error();
            rockX += dx;

            if (collide(grid, shape, rockX, rockY)) {
                rockX -= dx;
            }

            rockY--;

            if (collide(grid, shape, rockX, rockY)) {
                rockY++;
                if (rockY > tallestY) tallestY = rockY;
                place(grid, shape, rockX, rockY);
                break;
            }
        }

        history.push(tallestY);
    }

    return { history, grid };
}

export function solve(input: string[]): ISolution<number> {
    const { history, grid } = simulate(input[0]);

    // Part 1

    // (I'm one off on this part, I guess because my "first line" is 0)
    const part1 = history[2021] + 1;

    // Part 2

    // Search for a cycle in the grid output
    const gridStrings = grid.map(line => line.join(''));
    let yCycle = 0, yCycleStart = 0;
    for (let i = 0; i < gridStrings.length; i++) {
        const next = gridStrings.indexOf(gridStrings[i], i + 1);
        if (next < 0) continue;

        let match = true;
        for (let j = 1; j < 30; j++) {
            if (gridStrings[i + j] !== gridStrings[next + j]) {
                match = false;
                break;
            }
        }

        if (match) {
            yCycleStart = i;
            yCycle = next - i;

            if (gridStrings[yCycleStart + yCycle * 7] !== gridStrings[yCycleStart]) {
                // Just in case, verify assumptions
                throw new Error('Failed to detect a real cycle');
            }

            break;
        }
    }

    // Now deduce rock cycle from grid cycle
    let first: number = -1;
    let rockCycle = 0, rockCycleStart = 0;
    for (let i = 0; i < history.length; i++) {
        if ((history[i] - yCycleStart) % yCycle === 0) {
            if (first === -1) {
                first = i;
            } else if (history[first] !== history[i]) {
                // SNEAKY CHECK - lots of rocks can fall without updating tallest Y again,
                // so make sure we jump ahead to the next Y cycle
                rockCycleStart = first;
                rockCycle = i - first;
                break;
            }
        }
    }

    if (history[rockCycleStart + rockCycle * 3] - history[rockCycleStart + rockCycle * 2] !== yCycle) {
        // Just in case, verify assumptions
        throw new Error('Failed to detect a real rock cycle');
    }

    const targetRock = 1000000000000;

    const mod = targetRock % rockCycle;
    const mult = Math.floor(targetRock / rockCycle);

    // Why am I not off by one here??? No idea

    const part2 = history[mod] + mult * yCycle;

    return { part1, part2 };
}
