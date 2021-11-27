// ------------------------------------------------------------------------
// Year 2019 Day 09
// ------------------------------------------------------------------------
import { p, part1, part2 } from '../../util';

interface Input {
  push(value: number): void;
  next(): Promise<number>;
}

interface Output {
  push(value: number): void;
  receive(value: number): void;
}

interface Program {
  name: string;
  input: Input;
  output: Output;
  runUntilHalted(): Promise<void>;
}

// Construct a little program (input object, output object, and runner).
function createProgram(program: number[], name: string): Program {
  const input = {
    _queue: [],
    _resolve: () => {},
    push(value) {
      input._queue.push(value);
      input._resolve();
    },
    async next() {
      if (input._queue.length > 0) {
        return input._queue.shift();
      } else {
        await new Promise(resolve => input._resolve = resolve);
        return input._queue.shift();
      }
    }
  };
  const output = {
    push(value: number) {
      output.receive(value);
    },
    receive: (value: number) => {}
  }

  return {
    name,
    input,
    output,
    runUntilHalted: () => runUntilHalted(program, input, output, name)
  };
}

// Here's the core of our intcode runner from the previous puzzle, except now
// the input and output are async-ready. (Trying to keep this inner "runner"
// as clean as possible.)
async function runUntilHalted(program: number[], input: Input, output: Output, name: string) {
  let ip = 0;
  let relativeBase = 0;

  const wreg = (value: number, mode: number): number => {
    switch (mode) {
      case 0:
        return value;
      case 2:
        return relativeBase + value;
    }
  }

  const register = (value: number, mode: number): number => {
    switch (mode) {
      case 0:
        return program[value];
      case 1:
        return value;
      case 2:
        return program[relativeBase + value];
    }
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
        program[wreg(c, cm)] = register(a, am) + register(b, bm);
        ip += 4;
        break;
      case 2:
        program[wreg(c, cm)] = register(a, am) * register(b, bm);
        ip += 4;
        break;
      case 3:
        // p(name + ' opcode 3 waiting on input');
        program[wreg(a, am)] = await input.next();
        // p(name + ' opcode 3 received input ' + program[a]);
        ip += 2;
        break;
      case 4:
        // p(name + ' opcode 4 pushing value ' + register(a, am));
        output.push(register(a, am));
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
        program[wreg(c, cm)] = (register(a, am) < register(b, bm)) ? 1 : 0;
        ip += 4;
        break;
      case 8:
        program[wreg(c, cm)] = (register(a, am) === register(b, bm)) ? 1 : 0;
        ip += 4;
        break;
      case 9:
        relativeBase += register(a, am);
        ip += 2;
        break;
      case 99:
        return undefined;
      default:
        throw new Error('Encountered opcode ' + opcode);
    }
  }
}

async function execute(program, input) {
  let p = createProgram(program, 'hey');
  p.input.push(input);
  let result = [];
  p.output.receive = value => result.push(value);
  await p.runUntilHalted();
  return result;
}

export async function solve(input: string[]): Promise<void> {
  //// Part 1 ////
  let program = input[0].split(',').map(s => parseInt(s, 10));
  let result1 = await execute(program.slice(), 1);
  part1(result1);

  //// Part 2 ////
  let result2 = await execute(program.slice(), 2);
  part2(result2);
};
