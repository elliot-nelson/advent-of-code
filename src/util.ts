// Utilities

import * as path from 'path';
import * as fs from 'fs';

// 90% of the time, a "solution" to a puzzle part is a number. But sometimes it's
// a string of characters instead, or even a game board or an ASCII drawing of
// a number.
//
// One option would be to just let every puzzle solution define its own return
// type, but then you can't collect up all puzzle solutions and perform some other
// loop on them. So requiring every puzzle solution to be a "string array" is
// the most versatile representation.
//
// You also could have a puzzle have two different functions for solving part1 and
// part2, but later puzzles in a year often have a large amount of carryover,
// so allowing one function to solve both parts is usually better.
export interface ISolution {
    part1: string[];
    part2: string[];
}

export function load(...paths: string[]): string[] {
    const raw = fs.readFileSync(path.join(...paths), 'utf8');
    const lines = raw.split(/\r?\n/);

    if (lines[lines.length - 1].length === 0) {
        lines.splice(lines.length - 1, 1);
    }

    return lines;
}
