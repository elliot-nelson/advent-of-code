// Year 2022 Day 09
// Rope Bridge

import { ISolution } from '../../util';

interface Move {
    d: string;
    n: number;
}

interface XY {
    x: number;
    y: number;
}

const DIRECTIONS: Record<string, XY> = {
    'R': { x: 1, y: 0 },
    'U': { x: 0, y: -1 },
    'L': { x: -1, y: 0 },
    'D': { x: 0, y: 1 }
};

function simulate(moves: Move[], knotCount: number): number {
    const knots: XY[] = Array(knotCount).fill(undefined).map(elem => ({ x: 0, y: 0 }));
    const visited: Record<string, boolean> = {};
    visited['0,0'] = true;

    for (let i = 0; i < moves.length; i++) {
        const { d, n } = moves[i];

        for (let j = 0; j < n; j++) {
            knots[0].x += DIRECTIONS[d].x;
            knots[0].y += DIRECTIONS[d].y;

            for (let k = 1; k < knotCount; k++) {
                const head = knots[k - 1], tail = knots[k];

                if (head.y === tail.y && head.x > tail.x + 1) {
                    tail.x++;
                } else if (head.y === tail.y && head.x < tail.x - 1) {
                    tail.x--;
                } else if (head.x === tail.x && head.y > tail.y + 1) {
                    tail.y++;
                } else if (head.x === tail.x && head.y < tail.y - 1) {
                    tail.y--;
                } else {
                    if (Math.abs(head.x - tail.x) + Math.abs(head.y - tail.y) > 2) {
                        tail.x += (head.x - tail.x) / Math.abs(head.x - tail.x);
                        tail.y += (head.y - tail.y) / Math.abs(head.y - tail.y);
                    }
                }
            }

            visited[knots[knotCount - 1].x + ',' + knots[knotCount - 1].y] = true;
        }
    }

    return Object.keys(visited).length;
}

export function solve(input: string[]): ISolution<number> {
    const moves: Move[] = input.map(line => {
        const arr = line.split(' ');
        return { d: arr[0], n: Number(arr[1]) };
    });

    // Part 1
    const part1 = simulate(moves, 2);

    // Part 2
    const part2 = simulate(moves, 10);

    return { part1, part2 };
}
