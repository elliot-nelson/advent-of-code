// Year 2021 Day 04
// The Ideal Stocking Stuffer

import { load }  from '../../util';
import { solve } from './IdealStockingStuffer';

describe('IdealStockingStuffer', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(609043);
        expect(solution.part2).toEqual(6742839);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(282749);
        expect(solution.part2).toEqual(9962624);
    });
});
