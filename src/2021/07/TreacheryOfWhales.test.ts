// Year 2021 Day 07
// The Treachery Of Whales

import { load }  from '../../util';
import { solve } from './TreacheryOfWhales';

describe('TreacheryOfWhales', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(37);
        expect(solution.part2).toEqual(168);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(342730);
        expect(solution.part2).toEqual(92335207);
    });
});
