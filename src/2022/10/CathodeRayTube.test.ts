// Year 2022 Day 10
// Cathode-Ray Tube

import { load }  from '../../util';
import { solve } from './CathodeRayTube';

describe('CathodeRayTube', () => {
    it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual('13140');
        expect(solution.part2.split('\n')).toEqual([
            '##..##..##..##..##..##..##..##..##..##..',
            '###...###...###...###...###...###...###.',
            '####....####....####....####....####....',
            '#####.....#####.....#####.....#####.....',
            '######......######......######......####',
            '#######.......#######.......#######.....'
        ]);
    });

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual('12880');
        expect(solution.part2.split('\n')).toEqual([
            '####..##....##..##..###....##.###..####.',
            '#....#..#....#.#..#.#..#....#.#..#.#....',
            '###..#.......#.#..#.#..#....#.#..#.###..',
            '#....#.......#.####.###.....#.###..#....',
            '#....#..#.#..#.#..#.#....#..#.#.#..#....',
            '#.....##...##..#..#.#.....##..#..#.####.'
        ]);
    });
});
