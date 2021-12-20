// Year 2021 Day 20
// Trench Map

import { ISolution } from '../../util';

function expand(image: number[][], border: number, fillValue: number): number[][] {
    let result: number[][] = [...Array(image.length + border * 2)].map(row => {
        return Array(image[0].length + border * 2).fill(fillValue);
    });

    for (let y = 0; y < image.length; y++) {
        for (let x = 0; x < image[0].length; x++) {
            result[y + border][x + border] = image[y][x];
        }
    }

    return result;
}

function enhance(image: number[][], algorithm: number[]): number[][] {
    let result: number[][] = [];

    for (let y = 1; y < image.length - 1; y++) {
        result[y - 1] = [];
        for (let x = 1; x < image[0].length - 1; x++) {
            let bits: string = [
                image[y - 1][x - 1],
                image[y - 1][x],
                image[y - 1][x + 1],
                image[y][x - 1],
                image[y][x],
                image[y][x + 1],
                image[y + 1][x - 1],
                image[y + 1][x],
                image[y + 1][x + 1],
            ].join('');
            let idx = parseInt(bits, 2);
            result[y - 1][x - 1] = algorithm[idx];
        }
    }

    return result;
}

export function solve(input: string[]): ISolution<number> {
    const sections: string[] = input.join('\n').split('\n\n');
    const algorithm: number[] = sections[0].replace(/\n/g, '').split('').map(x => x === '#' ? 1 : 0);
    let image: number[][] = sections[1].split('\n').map(row => {
        return row.split('').map(x => x === '#' ? 1 : 0);
    });

    // Start with a 3-pixel black border.
    //   1 pixel for "growth" of the image in next enhancement
    //   1 pixel because we "shrink" the image each enhancement
    //   1 pixel for padding
    image = expand(image, 3, 0);

    const counts: number[] = [];

    for (let i = 0; i < 50; i++) {
        // Each image enhancement shrinks the image by 1 pixel on every side
        image = enhance(image, algorithm);

        // So we compensate by increasing it again by 2
        //   1 pixel for "growth" of image in next enhancement
        //   1 pixel because the next enhancement will shrink again
        //
        // (But this time, note our fill color is whatever the border currently is,
        // since the infinite image space might have flipped from 0 to 1.)
        image = expand(image, 2, image[0][0]);

        counts[i] = image.reduce((sum, row) => sum + row.reduce((sum2, value) => sum2 + value), 0);
    }

    // Part 1
    const part1: number = counts[1];

    // Part 2
    const part2: number = counts[49];

    return { part1, part2 };
}
