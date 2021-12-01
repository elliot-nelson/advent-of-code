// Year 2021 Day 01
// Sonar Sweep

import { load }  from '../../util';
import { solve } from './SonarSweep';

describe('SonarSweep', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(['7']);
        expect(solution.part2).toEqual(['5']);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(['1162']);
        expect(solution.part2).toEqual(['1190']);
    });
});
