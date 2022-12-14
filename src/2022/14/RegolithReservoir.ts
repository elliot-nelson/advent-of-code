// Year 2022 Day 14
// Regolith Reservoir

import { ISolution } from '../../util';

type XY = { x: number, y: number };

function simulateSandGrains(grid: Record<string, string>, floorLevel: number, floorThreshold: number): number {
    let grains: number = 0;

    // If sand reaches the floor level, it's treated as a solid infinitely wide floor.
    // If sand reaches the floor threshold, it falls into a bottomless void.

    for (;;) {
        let sand: XY = { x: 500, y: 0 };
        let done = false;

        for(;;) {
            if (grid[`500,0`] === 'o') {
                done = true;
                break;
            }

            if (sand.y >= floorThreshold) {
                done = true;
                break;
            }

            let c = grid[`${sand.x},${sand.y + 1}`];
            if (c !== '#' && c !== 'o' && sand.y + 1 < floorLevel) {
                sand.y++; continue;
            }

            c = grid[`${sand.x - 1},${sand.y + 1}`];
            if (c !== '#' && c !== 'o' && sand.y + 1 < floorLevel) {
                sand.x--; sand.y++; continue;
            }

            c = grid[`${sand.x + 1},${sand.y + 1}`];
            if (c !== '#' && c !== 'o' && sand.y + 1 < floorLevel) {
                sand.x++; sand.y++; continue;
            }

            grid[`${sand.x},${sand.y}`] = 'o';
            grains++;
            break;
        }

        if (done) break;
    }

    return grains;
}

export function solve(input: string[]): ISolution<number> {
    const grid: Record<string, string> = {};

    let highestY: number = 0;

    for (const line of input) {
        const coords: XY[]  = line.split(' -> ').map(s => {
            const c = s.split(',').map(x => Number(x));
            return { x: c[0], y: c[1] };
        });

        for (let i = 0; i < coords.length - 1; i++) {
            let a = coords[i], b = coords[i + 1];
            highestY = Math.max(highestY, a.y, b.y);

            if (a.x === b.x) {
                let dy = [a.y, b.y].sort((a, b) => a - b);
                for (let y = dy[0]; y <= dy[1]; y++) {
                    grid[`${a.x},${y}`] = '#';
                }
            } else {
                let dx = [a.x, b.x].sort((a, b) => a - b);
                for (let x = dx[0]; x <= dx[1]; x++) {
                    grid[`${x},${a.y}`] = '#';
                }
            }
        }
    }

    const floorLevel: number = highestY + 2;

    // Part 1
    const part1 = simulateSandGrains({ ...grid }, floorLevel + 10, floorLevel);

    // Part 2
    const part2 = simulateSandGrains({ ...grid }, floorLevel, floorLevel + 10);

    return { part1, part2 };
}
