// Year 2022 Day 08
// Treetop Tree House

import { load }  from '../../util';
import { solve } from './TreetopTreeHouse';

describe('TreetopTreeHouse', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(21);
        expect(solution.part2).toEqual(8);
    });
    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(1814);
        expect(solution.part2).toEqual(330786);
    });
});
