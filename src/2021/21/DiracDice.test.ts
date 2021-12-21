// Year 2021 Day 21
// Dirac Dice

import { load }  from '../../util';
import { solve } from './DiracDice';

describe('DiracDice', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(739785);
        expect(solution.part2).toEqual(444356092776315);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(798147);
        expect(solution.part2).toEqual(809953813657517);
    });
});
