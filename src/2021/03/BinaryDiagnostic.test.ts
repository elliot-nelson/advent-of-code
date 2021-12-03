// Year 2021 Day 03
// Binary Diagnostic

import { load }  from '../../util';
import { solve } from './BinaryDiagnostic';

describe('BinaryDiagnostic', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(198);
        expect(solution.part2).toEqual(230);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(741950);
        expect(solution.part2).toEqual(903810);
    });
});
