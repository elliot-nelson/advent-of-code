// Year 2022 Day 17
// Pyroclastic Flow

import { load }  from '../../util';
import { solve } from './PyroclasticFlow';

describe('PyroclasticFlow', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(3068);
        expect(solution.part2).toEqual(1514285714288);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(3102);
        expect(solution.part2).toEqual(1539823008825);
    });
});
