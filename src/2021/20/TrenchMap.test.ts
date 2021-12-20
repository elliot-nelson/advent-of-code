// Year 2021 Day 20
// Trench Map

import { load }  from '../../util';
import { solve } from './TrenchMap';

describe('TrenchMap', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(35);
        expect(solution.part2).toEqual(3351);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(5622);
        expect(solution.part2).toEqual(20395);
    });
});
