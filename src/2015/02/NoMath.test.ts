// Year 2015 Day 02
// I Was Told There Would Be No Math

import { load }  from '../../util';
import { solve } from './NoMath';

describe('NoMath', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(101);
        expect(solution.part2).toEqual(48);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(1606483);
        expect(solution.part2).toEqual(3842356);
    });
});
