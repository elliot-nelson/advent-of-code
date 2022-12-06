// Year 2022 Day 06
// Tuning Trouble

import { load }  from '../../util';
import { solve } from './TuningTrouble';

describe('TuningTrouble', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(7);
        expect(solution.part2).toEqual(19);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(1804);
        expect(solution.part2).toEqual(2508);
    });
});
