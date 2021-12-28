// Year 2021 Day 23
// Amphipod

import { load }  from '../../util';
import { solve } from './Amphipod';

describe('Amphipod', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(12521);
        expect(solution.part2).toEqual(44169);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(14467);
        expect(solution.part2).toEqual(48759);
    });
});
