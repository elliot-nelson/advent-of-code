// Year 2022 Day 05
// Supply Stacks

import { load }  from '../../util';
import { solve } from './SupplyStacks';

describe('Puzzle', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual('CMZ');
        expect(solution.part2).toEqual('MCD');
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual('QNHWJVJZW');
        expect(solution.part2).toEqual('BPCZJLFJW');
    });
});
