// Year 2021 Day 18
// Snailfish

import { load }  from '../../util';
import { solve } from './Snailfish';

describe('Snailfish', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(4140);
        expect(solution.part2).toEqual(3993);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(2501);
        expect(solution.part2).toEqual(4935);
    });
});
