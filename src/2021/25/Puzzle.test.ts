// Year 2021 Day 25
// Sea Cucumber

import { load }  from '../../util';
import { solve } from './Puzzle';

describe('Puzzle', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(58);
        expect(solution.part2).toEqual(0);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(598);
        expect(solution.part2).toEqual(0);
    });
});
