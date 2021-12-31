// Year 2021 Day 22
// Reactor Reboot

import { load }  from '../../util';
import { solve } from './ReactorReboot';

describe('ReactorReboot', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(474140);
        expect(solution.part2).toEqual(2758514936282235);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(603661);
        expect(solution.part2).toEqual(1237264238382479);
    });
});
