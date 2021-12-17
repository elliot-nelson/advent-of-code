// Year 2021 Day 17
// Trick Shot

import { load }  from '../../util';
import { solve } from './TrickShot';

describe('TrickShot', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(45);
        expect(solution.part2).toEqual(112);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(5995);
        expect(solution.part2).toEqual(3202);
    });
});
