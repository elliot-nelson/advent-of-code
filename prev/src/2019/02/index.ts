// ------------------------------------------------------------------------
// Year 2019 Day 02
//
// Part 1: The return of the "build an opcode processor" puzzle, so soon!
// This is a pretty simple switch statement, plus some furious checking
// to make sure you are grabbing the referenced parameters and not the
// parameters themselves.
//
// Part 2: Wrap the processor in a loop and run it until you get the
// desired output.
//
// As usual, this puzzle is setup for future puzzles in which the inputs,
// outputs, and opcodes themselves will get increasingly convoluted. After
// spamming the submit button, I've cleaned up my answer to make it easier
// to extend in the future.
// ------------------------------------------------------------------------
import { p, part1, part2 } from '../../util';

function runUntilHalted(program: number[]): void {
  let ip = 0;

  for (;;) {
    switch (program[ip]) {
      case 1:
        program[program[ip + 3]] = program[program[ip + 1]] + program[program[ip + 2]];
        ip += 4;
        break;
      case 2:
        program[program[ip + 3]] = program[program[ip + 1]] * program[program[ip + 2]];
        ip += 4;
        break;
      case 99:
        return;
    }
  }
}

function execute(program: number[], inputs: number[]): number {
  program = program.slice();
  program[1] = inputs[0];
  program[2] = inputs[1];
  runUntilHalted(program);
  return program[0];
}

function solveFor(program: number[], desiredOutput: number): { noun: number, verb: number } {
  for (let noun = 0; noun < 99; noun++) {
    for (let verb = 0; verb < 99; verb++) {
      if (execute(program, [noun, verb]) === desiredOutput) return { noun, verb };
    }
  }
}

export function solve(input: string[]): void {
  //// Part 1 ////
  let program = input[0].split(',').map(s => parseInt(s, 10));
  let result1 = execute(program, [12, 2]);
  part1(result1);

  //// Part 2 ////
  let { noun, verb } = solveFor(program, 19690720);
  let result2 = 100 * noun + verb;
  part2(result2);
};
