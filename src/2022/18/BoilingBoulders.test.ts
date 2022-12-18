// Year 2022 Day 18
// Boiling Boulders

import { load }  from '../../util';
import { solve } from './BoilingBoulders';

describe('BoilingBoulders', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(64);
        expect(solution.part2).toEqual(58);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(3448);
        expect(solution.part2).toEqual(2052);
    });
});
