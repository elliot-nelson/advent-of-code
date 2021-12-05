// Year 2021 Day 05
// Hydrothermal Venture

import { ISolution } from '../../util';

type Point = {
    x: number;
    y: number;
}

type Line = Point[];

function countIntersections(lines: Line[], includeDiagonals: boolean): number {
    const hash: Record<string, number> = {};

    for (let line of lines) {
        let dx = line[1].x === line[0].x ? 0 : (line[1].x - line[0].x > 0 ? 1 : -1);
        let dy = line[1].y === line[0].y ? 0 : (line[1].y - line[0].y > 0 ? 1 : -1);

        if (!includeDiagonals && dx !== 0 && dy !== 0) continue;

        let point = { ...line[0] };

        for (;;) {
            let key = `${point.x},${point.y}`;
            hash[key] = (hash[key] || 0) + 1;
            if (point.x === line[1].x && point.y === line[1].y) break;
            point.x += dx;
            point.y += dy;
        }
    }

    return Object.keys(hash).filter(key => hash[key] > 1).length;
}

export function solve(input: string[]): ISolution<number> {
    const lines = input.map(text => text.split(' -> ').map(entry => {
        let numbers = entry.split(',').map(Number);
        return { x: numbers[0], y: numbers[1] };
    }));

    // Part 1
    const part1 = countIntersections(lines, false);

    // Part 2
    const part2 = countIntersections(lines, true);

    return { part1, part2 };
}
