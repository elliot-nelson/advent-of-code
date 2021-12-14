// Year 2021 Day 14
// Extended Polymerization

import { load }  from '../../util';
import { solve } from './ExtendedPolymerization';

describe('ExtendedPolymerization', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(1588);
        expect(solution.part2).toEqual(2188189693529);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(2745);
        expect(solution.part2).toEqual(3420801168962);
    });
});
