// Year 2021 Day xx
// xx

import { ISolution } from '../../util';

type Instruction = {
    op: string;
    lvar: string;
    rvar?: string;
    rvalue?: number;
}

type Register = {
    w: number;
    x: number;
    y: number;
    z: number;
}

function execute(program: Instruction[], inputs: number[]): Register {
    const vars: Register = {
        w: 0,
        x: 0,
        y: 0,
        z: 0
    };
    inputs = [...inputs];

    // Program
    for (let instr of program) {
        switch (instr.op) {
            case 'inp':
                vars[instr.lvar] = inputs.shift()!;
                break;
            case 'add':
                vars[instr.lvar] += instr.rvar ? vars[instr.rvar] : instr.rvalue!;
                break;
            case 'mul':
                vars[instr.lvar] *= instr.rvar ? vars[instr.rvar] : instr.rvalue!;
                break;
            case 'div':
                vars[instr.lvar] = Math.floor(vars[instr.lvar] / (instr.rvar ? vars[instr.rvar] : instr.rvalue!));
                break;
            case 'mod':
                vars[instr.lvar] %= instr.rvar ? vars[instr.rvar] : instr.rvalue!;
                break;
            case 'eql':
                vars[instr.lvar] = (vars[instr.lvar] === (instr.rvar ? vars[instr.rvar] : instr.rvalue!) ? 1 : 0);
                break;
        }
    }

    return vars;
}

function digit(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getem(program: Instruction[]): number[] {
    // A model number can be broken up into:
    //
    //   xxxAABBCCxxxDD
    //
    // Where:
    //
    //   AA are digits 92 or 81 (the second is 7 lower than the first)
    //   BB are identical digits (11, 22, 33, 99, etc.)
    //   CC are digits 16, 27, 38, or 49 (the second is 5 higher than the first)
    //   DD are digits 98, 87, 76, 65, 54, 43, 32, or 21 (the second is 1 lower)
    //
    // There might be rules for x's, bumt I didn't discover them.

    const valid: number[] = [];

    for (let x = 111_111; x <= 999_999; x++) {
        const xs: number[] = String(x).split('').map(Number);
        if (xs.includes(0)) continue;

        //for (let a = 8; a <= 9; a++) {
          //  for (let b = 1; b <= 9; b++) {
            //    for (let c = 1; c <= 4; c++) {
              //      for (let d = 2; d <= 9; d++) {
                  let a = 9;
                  let b = 9;
                  let c = 4;
                  let d = 9;

                        const possible: number[] = [
                            xs[0], xs[1], xs[2],
                            a, a - 7,
                            b, b,
                            c, c + 5,
                            xs[3], xs[4], xs[5],
                            d, d - 1
                        ];

                        if (execute(program, possible).z === 0) {
                            console.log(possible);
                            valid.push(Number(possible.join('')));
                        }
              //      }
            //    }
          //  }
        //}
    }

    return valid;
}

export function solve(input: string[]): ISolution<number> {
    const program: Instruction[] = input.map(line => {
        const elements = line.split(' ');
        if (elements.length === 2) {
            return {
                op: elements[0],
                lvar: elements[1]
            };
        } else if (['w', 'x', 'y', 'z'].includes(elements[2])) {
            return {
                op: elements[0],
                lvar: elements[1],
                rvar: elements[2]
            };
        } else {
            return {
                op: elements[0],
                lvar: elements[1],
                rvalue: Number(elements[2])
            };
        }
    });

    console.log(program);

    console.log('A');
    let v = getem(program);
    console.log(v);
    console.log('B');

    return { part1: 0, part2: 0 };

    // Part 1
    //console.log('part1');
    //console.log(execute(program, [7]));

/*    let j = 0;
    let z = 99_999_99_9_99;
    z -= 500000 * 21;
    for (let i = z; i >= 0; i--) {
        let k = Number(String(i) + (((i % 10) - 1 + 10) % 10));

        let k2 = String(k);
        k = Number(k2.slice(0, 9) + '935' + k2.slice(9));

        if (`${k}`.includes('0')) continue;
        let result = execute(program, `${k}`.split('').map(Number));
        //if (result.z < 555 || i % 1_000 === 0) {
            console.log(k, result, i % 11);
        //}
        if (result.z === 0) break;
        j++;
    }*/

    //59692994994921
    //59692884994943
    //59692994994998
    //
    // 16181111641521

    if (true) {
    for (let book = 299999; book >= 111111; book--) {
    //for (let book = 111111; book < 599999; book++) {
        let digs = String(book).split('').map(Number);

        //let num = 174_9233_49_725_21;
        //let k: number[] = [digs[0], digs[1], digs[2], 9,2,9,9,4,9, digs[3],digs[4],digs[5],9,8];
        let k: number[] = [digs[0], digs[1], digs[2], 8,1,1,1,1,6, digs[3],digs[4],digs[5],2,1];
        let sum = k.reduce((s,v) => s+v);

        if (k.includes(0)) continue;

        let barf = k.join('');
        let result = execute(program, k);
        if (result.z === 0)
        console.log(barf, ' -> ', result.z, sum);
    }

    return { part1: 0, part2: 0 };
    }

    const r = () => Math.floor(Math.random() * 9) + 1;

    let stack: string[] = [];
    for (let book = 0; book < 195000; book++) {
        //let k: number[] = [1,1,1,1,1,1,1,1,1,1,1,1,1,1].map(x => Math.floor(Math.random() * 9) + 1);
        let k: number[] = [1,1,1,1,1,1,1,1,1,1,1,1,1].map(x => Math.floor(Math.random() * 9) + 1);

        let b = r();
        let a = r();
        let c = r();
        if (a < 2) a = 2;
        if (c < 8) c = 8;

        k = [
            r(), r(), r(),
            c, c - 7,
            b, b,
            1, 6,
            r(), r(), r(),
            a, a - 1
        ];

        // 16192111641521

        /*
        k[13] = k[12] - 1;
        if (k[13] < 1) continue;

        k[6] = k[5];

        //k[3] = 9;
        //k[4] = 2;

        // 27, 38, 49
        if (k[7] === 2) {
            k[8] = 7;
        } else if (k[7] === 3) {
            k[8] = 8;
        } else if (k[7] === 4) {
            k[8] = 9;
        } else {
            continue;
        }
        */

        let barf = k.join('');
        let result = execute(program, k);
        if (result.z === 0) {
            stack.push(barf);
            console.log(barf, ' -> ', result.z);
        }
    }

    stack.sort();
    console.log(stack.join('\n'));

    return { part1: 0, part2: 0 };


    let j = 0;
    let start = 11111111117876;
    start = 11111111612998;
    start = 1111111_161_29_98;
    for (let i = start; i <= 99_999_999_999_999; i++) {
        let crab = String(i).split('').map(Number);

        if (crab[13] !== crab[12] - 1) continue;
        if ((crab[10] === 1 && crab[11] === 8) || (crab[10] === 2 && crab[11] === 9)) {
            // ok
        } else {
            continue;
        }

        if ((crab[8] === 6 && crab[9] === 1)) {
            // ok
        } else {
            continue;
        }

        let k = i;

        if (`${k}`.includes('0')) continue;
        let result = execute(program, `${k}`.split('').map(Number));
        //if (result.z < 555 || i % 1_000 === 0) {
        if (result.z < 55500) {
            console.log(k, result);
        }
        if (result.z === 0) break;
        j++;
        if (j > 5000) {
            console.log('finished...', i);
            break;
        }
    }

    const part1 = 0;

    // Part 2
    //console.log('part2');
    const part2 = 0;

    return { part1, part2 };
}
