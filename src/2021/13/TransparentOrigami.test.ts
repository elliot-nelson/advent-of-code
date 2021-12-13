// Year 2021 Day 13
// Transparent Origami

import { load } from '../../util';
import { solve } from './TransparentOrigami';

describe('TransparentOrigami', () => {
    it('runs example 1', () => {
        const input = load(__dirname, '../../src/2021/13/', 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual('17');
        expect(solution.part2).toMatchSnapshot();
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual('710');
        expect(solution.part2).toMatchSnapshot();
    });
});
