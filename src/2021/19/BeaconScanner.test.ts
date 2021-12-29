// Year 2021 Day 19
// Beacon Scanner

import { load }  from '../../util';
import { solve } from './BeaconScanner';

describe('BeaconScanner', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(79);
        expect(solution.part2).toEqual(3621);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(394);
        expect(solution.part2).toEqual(12304);
    });
});
