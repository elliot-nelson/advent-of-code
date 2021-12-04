// Year 2021 Day 04
// Giant Squid

import { load }  from '../../util';
import { solve } from './GiantSquid';

describe('Puzzle', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(4512);
        expect(solution.part2).toEqual(1924);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(50008);
        expect(solution.part2).toEqual(17408);
    });
});
