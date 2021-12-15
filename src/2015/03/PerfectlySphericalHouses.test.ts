// Year 2015 Day 03
// Perfectly Spherical Houses in a Vacuum

import { load }  from '../../util';
import { solve } from './PerfectlySphericalHouses';

describe('PerfectlySphericalHouses', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(2);
        expect(solution.part2).toEqual(11);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(2592);
        expect(solution.part2).toEqual(2360);
    });
});
