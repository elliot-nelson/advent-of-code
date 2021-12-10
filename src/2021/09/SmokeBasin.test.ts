// Year 2021 Day 09
// Smoke Basin

import { load }  from '../../util';
import { solve } from './SmokeBasin';

describe('SmokeBasin', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(15);
        expect(solution.part2).toEqual(1134);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(541);
        expect(solution.part2).toEqual(847504);
    });
});
