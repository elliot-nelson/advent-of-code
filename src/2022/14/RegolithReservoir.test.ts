// Year 2022 Day 14
// Regolith Reservoir

import { load }  from '../../util';
import { solve } from './RegolithReservoir';

describe('RegolithReservoir', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(24);
        expect(solution.part2).toEqual(93);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(578);
        expect(solution.part2).toEqual(24377);
    });
});
