// Year 2021 Day 02
// Dive!

import { load }  from '../../util';
import { solve } from './Dive';

describe('Dive', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(150);
        expect(solution.part2).toEqual(900);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(1882980);
        expect(solution.part2).toEqual(1971232560);
    });
});
