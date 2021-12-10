// Year 2021 Day 10
// Syntax Scoring

import { load }  from '../../util';
import { solve } from './SyntaxScoring';

describe('SyntaxScoring', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(26397);
        expect(solution.part2).toEqual(288957);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(344193);
        expect(solution.part2).toEqual(3241238967);
    });
});
