// Year 2022 Day 02
// Rock Paper Scissors

import { load }  from '../../util';
import { solve } from './RockPaperScissors';

describe('Puzzle', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(15);
        expect(solution.part2).toEqual(12);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(8392);
        expect(solution.part2).toEqual(10116);
    });
});
