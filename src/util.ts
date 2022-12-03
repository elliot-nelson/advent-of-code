// Utilities

import * as path from 'path';
import * as fs from 'fs';

export interface ISolution<T> {
    part1: T;
    part2: T;
}

export function load(...paths: string[]): string[] {
    const raw = fs.readFileSync(path.join(...paths), 'utf8');
    const lines = raw.split(/\r?\n/);

    if (lines[lines.length - 1].length === 0) {
        lines.splice(lines.length - 1, 1);
    }

    return lines;
}

export const Util = {
    group<T>(array: T[], count: number): T[][] {
        const result: T[][] = [];

        for (let i = 0; i < array.length / count; i++) {
            let k: T[] = [];
            for (let j = 0; j < count; j++) {
                k.push(array[i * count + j]);
            }
            result.push(k);
        }

        return result;
    }
};
