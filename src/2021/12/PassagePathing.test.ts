// Year 2021 Day 12
// Passage Pathing

import { load }  from '../../util';
import { solve } from './PassagePathing';

describe('PassagePathing', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(10);
        expect(solution.part2).toEqual(36);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(5178);
        expect(solution.part2).toEqual(130094);
    });

});
