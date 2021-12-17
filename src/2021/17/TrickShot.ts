// Year 2021 Day 17
// Trick Shot

import { ISolution } from '../../util';

type Target = {
    x: number[];
    y: number[];
}

type Hit = {
    xVelocity: number;
    yVelocity: number;
    maxY: number;
}

function hitsTarget(xVelocity: number, yVelocity: number, target: Target): number | boolean {
    let x = 0, y = 0, maxY = 0;

    for (;;) {
        if (y > maxY) maxY = y;

        if (x >= target.x[0] && x <= target.x[1] && y >= target.y[0] && y <= target.y[1]) {
            return maxY;
        }

        if (y < target.y[0]) return false;

        x += xVelocity;
        y += yVelocity;

        if (xVelocity > 0) {
            xVelocity--;
        } else if (xVelocity < 0) {
            xVelocity++;
        }
        yVelocity--;
    }
}

function possibleVelocities(target: Target): Hit[] {
    const hits: Hit[] = [];

    // This is a brute force scan, so the only interesting question is what min/max range
    // to use. The X is easy: 0 will never hit the target, and greater than the right
    // target bound will miss the target.
    //
    // Because the puzzle ensures there is a "highest Y" value, we know the highest possible
    // arc is a classic parabola in the air. If we draw a square around the source and target,
    // it would include that parabola. That would mean an max Y velocity of about 1/3 of that
    // square. (To be safe, though, I'm just iterating through the entire square of values,
    // for both X and Y.)

    const maxVelocity: number = Math.max(...target.x);

    for (let yVelocity = Math.min(...target.y); yVelocity <= maxVelocity; yVelocity++) {
        for (let xVelocity = 0; xVelocity <= maxVelocity; xVelocity++) {
            const result: number | boolean = hitsTarget(xVelocity, yVelocity, target);
            if (typeof result === 'number') hits.push({ xVelocity, yVelocity, maxY: result });
        }
    }

    return hits;
}

export function solve(input: string[]): ISolution<number> {
    const elements = input[0].match(/target area: x=(.+)\.\.(.+), y=(.+)\.\.(.+)/)!;
    const target: Target = {
        x: elements.slice(1, 3).map(Number),
        y: elements.slice(3, 5).map(Number)
    };

    const hits: Hit[] = possibleVelocities(target);

    // Part 1
    hits.sort((a, b) => b.maxY - a.maxY);
    const part1 = hits[0].maxY;

    // Part 2
    const part2: number = hits.length;

    return { part1, part2 };
}
