// Year 2022 Day 04
// Camp Cleanup

import { load }  from '../../util';
import { solve } from './CampCleanup';

describe('CampCleanup', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(2);
        expect(solution.part2).toEqual(4);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(560);
        expect(solution.part2).toEqual(839);
    });
});
