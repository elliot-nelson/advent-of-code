// Year 2022 Day 09
// Rope Bridge

import { load }  from '../../util';
import { solve } from './RopeBridge';

describe('RopeBridge', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(13);
        expect(solution.part2).toEqual(1);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(5960);
        expect(solution.part2).toEqual(2327);
    });
});
