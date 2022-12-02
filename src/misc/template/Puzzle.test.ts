// Year 2022 Day xx
// xx

import { load }  from '../../util';
import { solve } from './Puzzle';

describe('Puzzle', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        //console.log(solution);
        expect(solution.part1).toEqual(0);
        expect(solution.part2).toEqual(0);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        //console.log(solution);
        expect(solution.part1).toEqual(0);
        expect(solution.part2).toEqual(0);
    });
});
