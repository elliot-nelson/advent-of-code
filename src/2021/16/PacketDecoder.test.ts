// Year 2021 Day 16
// Packet Decoder

import { load }  from '../../util';
import { solve } from './PacketDecoder';

describe('PacketDecoder', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(31);
        expect(solution.part2).toEqual(54);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(955);
        expect(solution.part2).toEqual(158135423448);
    });
});
