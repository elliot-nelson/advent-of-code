// Year 2021 Day 15
// Chiton

import { load }  from '../../util';
import { solve } from './Chiton';

describe('Chiton', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(40);
        expect(solution.part2).toEqual(315);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(447);
        expect(solution.part2).toEqual(2825);
    });
});
