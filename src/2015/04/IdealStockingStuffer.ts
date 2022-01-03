// Year 2021 Day 04
// The Ideal Stocking Stuffer

import * as crypto from 'crypto';

import { ISolution } from '../../util';

function md5(input: string): string {
    return crypto.createHash('md5').update(input).digest('hex');
}

// There's not much we can do to make brute force smarter, but at least we
// can avoid covering the same ground twice.
function findZeroes(prefix: string): Record<string, number> {
    const hash: Record<string, number> = {};

    for (let i = 1;; i++) {
        let result = md5(prefix + i);
        if (result.startsWith('000000')) {
            hash['000000'] = hash['000000'] || i;
            return hash;
        } else if (result.startsWith('00000')) {
            hash['00000'] = hash['00000'] || i;
        }
    }
}

export function solve(input: string[]): ISolution<number> {
    const prefix: string = input[0];
    const zeroes: Record<string, number> = findZeroes(prefix);

    // Part 1
    const part1: number = zeroes['00000'];

    // Part 2
    const part2: number = zeroes['000000'];

    return { part1, part2 };
}
