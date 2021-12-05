// Year 2021 Day 05
// Hydrothermal Venture

import { load }  from '../../util';
import { solve } from './HydrothermalVenture';

describe('HydrothermalVenture', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(5);
        expect(solution.part2).toEqual(12);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(5306);
        expect(solution.part2).toEqual(17787);
    });
});
