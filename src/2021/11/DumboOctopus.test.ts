// Year 2021 Day 11
// Dumbo Octopus

import { load }  from '../../util';
import { solve } from './DumboOctopus';

describe('DumboOctopus', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(1656);
        expect(solution.part2).toEqual(195);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(1694);
        expect(solution.part2).toEqual(346);
    });
});
