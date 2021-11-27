// ------------------------------------------------------------------------
// Year 2019 Day 05
//
// Part 1: I saw this puzzle coming and was ready for it! Using my initial
// solutions for Day 02, added the new opcodes and the mode calculation,
// then updated the way input and output are provided and got the expected
// output on the first try.
//
// Part 2: There's a big scary wall of text here, but all that really
// matters is that you're adding opcodes 5-8 and just make sure that they
// respect the new "mode" value the same way the other do. Slammed in the
// new opcodes and once again got the expected output first try. I'll
// take it!
// ------------------------------------------------------------------------
import { p, part1, part2 } from '../../util';

function runUntilHalted(program: number[], input: number): number {
  let ip = 0;
  let output = 0;

  const register = (value: number, mode: number): number => {
    return mode === 1 ? value : program[value];
  }

  for (;;) {
    // Preemptively prepare all parameters even if we won't use them
    let opcode = program[ip] % 100;
    let am = Math.floor(program[ip] / 100) % 10;
    let bm = Math.floor(program[ip] / 1000) % 10;
    let cm = Math.floor(program[ip] / 10000) % 10;
    let a = program[ip + 1];
    let b = program[ip + 2];
    let c = program[ip + 3];

    // "register(a,am)" and "register(b,bm)" automatically respect the instruction
    // modes specified - position vs immediate.
    switch (opcode) {
      case 1:
        program[c] = register(a, am) + register(b, bm);
        ip += 4;
        break;
      case 2:
        program[c] = register(a, am) * register(b, bm);
        ip += 4;
        break;
      case 3:
        program[a] = input;
        ip += 2;
        break;
      case 4:
        output = register(a, am);
        ip += 2;
        break;
      case 5:
        if (register(a, am) !== 0) {
          ip = register(b, bm);
        } else {
          ip += 3;
        }
        break;
      case 6:
        if (register(a, am) === 0) {
          ip = register(b, bm);
        } else {
          ip += 3;
        }
        break;
      case 7:
        program[c] = (register(a, am) < register(b, bm)) ? 1 : 0;
        ip += 4;
        break;
      case 8:
        program[c] = (register(a, am) === register(b, bm)) ? 1 : 0;
        ip += 4;
        break;
      case 99:
        return output;
    }
  }
}

function execute(program: number[], input: number): number {
  program = program.slice();
  return runUntilHalted(program, input);
}

export function solve(input: string[]): void {
  //// Part 1 ////
  let program = input[0].split(',').map(s => parseInt(s, 10));
  let result1 = execute(program, 1);
  part1(result1);

  //// Part 2 ////
  let result2 = execute(program, 5);
  part2(result2);
};
