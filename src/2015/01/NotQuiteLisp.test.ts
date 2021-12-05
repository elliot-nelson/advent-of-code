// Year 2015 Day 01
// Not Quite Lisp

import { load }  from '../../util';
import { solve } from './NotQuiteLisp';

describe('NotQuiteLisp', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(3);
        expect(solution.part2).toEqual(1);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(280);
        expect(solution.part2).toEqual(1797);
    });
});
