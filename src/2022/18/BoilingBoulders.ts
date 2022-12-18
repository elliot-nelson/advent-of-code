// Year 2022 Day 18
// Boiling Boulders

import { ISolution } from '../../util';

const DIRECTIONS: number[][] = [
    [-1, 0, 0],
    [1, 0, 0],
    [0, -1, 0],
    [0, 1, 0],
    [0, 0, -1],
    [0, 0, 1]
];

function allAirSpaces(cubemap: Record<string, boolean>, dimensions: number[]): Record<string, boolean> {
    const air: Record<string, boolean> = {};

    for (let x = dimensions[0]; x <= dimensions[1]; x++) {
        for (let y = dimensions[2]; y <= dimensions[3]; y++) {
            for (let z = dimensions[4]; z <= dimensions[5]; z++) {
                if (!cubemap[`${x},${y},${z}`]) {
                    air[`${x},${y},${z}`] = true;
                }
            }
        }
    }

    return air;
}

function outerSteamSpaces(cubemap: Record<string, boolean>, dimensions: number[]): Record<string, boolean> {
    const steam: Record<string, boolean> = {};

    for (let x = dimensions[0]; x <= dimensions[1]; x++) {
        for (let y = dimensions[2]; y <= dimensions[3]; y++) {
            for (let z = dimensions[4]; z <= dimensions[5]; z++) {
                if (x === dimensions[0] || x === dimensions[1] || y === dimensions[2] || y === dimensions[3] || z === dimensions[4] || z === dimensions[5]) {
                    steam[`${x},${y},${z}`] = true;
                }
            }
        }
    }

    return steam;
}

function countSurfaces(spaces: Record<string, boolean>, cubemap: Record<string, boolean>): number {
    let surfaces: number = 0;

    for (const key of Object.keys(spaces)) {
        const xyz = key.split(',').map(k => Number(k));

        for (const d of DIRECTIONS) {
            const key2 = [xyz[0] + d[0], xyz[1] + d[1], xyz[2] + d[2]].join(',');
            if (cubemap[key2]) {
                surfaces++;
            }
        }
    }

    return surfaces;
}

function expand(steam: Record<string, boolean>, cubemap: Record<string, boolean>, dimensions: number[]) {
    const stack: string[] = Object.keys(steam);

    while (stack.length > 0) {
        const key = stack.shift()!;
        const xyz = key.split(',').map(k => Number(k));

        for (const d of DIRECTIONS) {
            const xyz2 = [xyz[0] + d[0], xyz[1] + d[1], xyz[2] + d[2]];
            if (xyz2[0] >= dimensions[0] && xyz[0] <= dimensions[1] && xyz2[1] >= dimensions[2] && xyz2[1] <= dimensions[3] && xyz2[2] >= dimensions[4] && xyz2[2] <= dimensions[5]) {
                const key2 = xyz2.join(',');
                if (!cubemap[key2] && !steam[key2]) {
                    steam[key2] = true;
                    stack.push(key2);
                }
            }
        }
    }
}

export function solve(input: string[]): ISolution<number> {
    const cubes: number[][] = input.map(line => line.split(',').map(x => Number(x)));

    const cubemap: Record<string, boolean> = {};
    for (let i = 0; i < cubes.length; i++) {
        cubemap[cubes[i].join(',')] = true;
    }

    const dimensions: number[] = [
        Math.min(...cubes.map(c => c[0])) - 1,
        Math.max(...cubes.map(c => c[0])) + 1,
        Math.min(...cubes.map(c => c[1])) - 1,
        Math.max(...cubes.map(c => c[1])) + 1,
        Math.min(...cubes.map(c => c[2])) - 1,
        Math.max(...cubes.map(c => c[2])) + 1
    ];

    // Part 1
    const air: Record<string, boolean> = allAirSpaces(cubemap, dimensions);
    const part1 = countSurfaces(air, cubemap);

    // Part 2
    const steam: Record<string, boolean> = outerSteamSpaces(cubemap, dimensions);
    expand(steam, cubemap, dimensions);
    const part2 = countSurfaces(steam, cubemap);

    return { part1, part2 };
}
