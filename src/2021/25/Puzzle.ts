// Year 2021 Day 25
// Sea Cucumber

import { ISolution } from '../../util';

function step(seafloor: string[][]): string[][] {
    let result: string[][] = seafloor.map(row => row.slice());

    // First, move east-facing sea cucumber herd
    for (let y = 0; y < seafloor.length; y++) {
        for (let x = 0; x < seafloor[0].length; x++) {
            const x2 = (x + 1) % seafloor[0].length;

            if (seafloor[y][x] === '>' && seafloor[y][x2] === '.') {
                result[y][x] = '.';
                result[y][x2] = '>';
            }
        }
    }

    seafloor = result;
    result = seafloor.map(row => row.slice());

    // Second, move south-facing sea cucumber herd
    for (let y = 0; y < seafloor.length; y++) {
        const y2 = (y + 1) % seafloor.length;
        for (let x = 0; x < seafloor[0].length; x++) {
            if (seafloor[y][x] === 'v' && seafloor[y2][x] === '.') {
                result[y][x] = '.';
                result[y2][x] = 'v';
            }
        }
    }

    return result;
}

export function solve(input: string[]): ISolution<number> {
    let seafloor: string[][] = input.map(line => line.split(''));
    let steps: number = 0;

    for (;;) {
        steps++;

        let before: string = seafloor.map(row => row.join('')).join('');
        seafloor = step(seafloor);
        let after: string = seafloor.map(row => row.join('')).join('');

        if (before === after) break;
    }

    // Part 1
    const part1: number = steps;

    // Part 2
    //console.log('part2');
    const part2 = 0;

    return { part1, part2 };
}
