// Year 2022 Day 01
// Calorie Counting

import { load }  from '../../util';
import { solve } from './CalorieCounting';

describe('Puzzle', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(24000);
        expect(solution.part2).toEqual(45000);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(72478);
        expect(solution.part2).toEqual(210367);
    });
});
