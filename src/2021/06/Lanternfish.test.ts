// Year 2021 Day 06
// Lanternfish

import { load }  from '../../util';
import { solve } from './Lanternfish';

describe('Lanternfish', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(5934);
        expect(solution.part2).toEqual(26984457539);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(350605);
        expect(solution.part2).toEqual(1592778185024);
    });
});
