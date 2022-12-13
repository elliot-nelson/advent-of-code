// Year 2022 Day 13
// Distress Signal

import { load }  from '../../util';
import { solve } from './DistressSignal';

describe('DistressSignal', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(13);
        expect(solution.part2).toEqual(140);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(6046);
        expect(solution.part2).toEqual(21423);
    });
});
