// Year 2022 Day 03
// Rucksack Reorganization

import { load }  from '../../util';
import { solve } from './RucksackReorganization';

describe('RucksackReorganization', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(157);
        expect(solution.part2).toEqual(70);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(7903);
        expect(solution.part2).toEqual(2548);
    });
});
