// Year 2021 Day 24
// Arithmetic Logic Unit

import { load }  from '../../util';
import { solve } from './ArithmeticLogicUnit';

describe('ArithmeticLogicUnit', () => {
    /*it('runs example 1', () => {
        const input = load(__dirname, 'example1.txt');
        const solution = solve(input);

        //console.log(solution);
        expect(solution.part1).toEqual(0);
        expect(solution.part2).toEqual(0);
    });*/

    it('runs my input', () => {
        const input = load(__dirname, 'input.txt');
        const solution = solve(input);

        expect(solution.part1).toEqual(59692994994998);
        expect(solution.part2).toEqual(16181111641521);
    });
});
