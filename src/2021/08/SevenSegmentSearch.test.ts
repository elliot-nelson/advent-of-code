// Year 2021 Day 08
// Seven Segment Search

import { load }  from '../../util';
import { solve } from './SevenSegmentSearch';

describe('SevenSegmentSearch', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(26);
        expect(solution.part2).toEqual(61229);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(530);
        expect(solution.part2).toEqual(1051087);
    });
});
