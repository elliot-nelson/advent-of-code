// ------------------------------------------------------------------------
// Year 2019 Day 07
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
        // p(name + ' opcode 3 waiting on input');
        program[a] = await input.next();
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
        program[c] = (register(a, am) < register(b, bm)) ? 1 : 0;
        ip += 4;
        break;
      case 8:
        program[c] = (register(a, am) === register(b, bm)) ? 1 : 0;
        ip += 4;
        break;
      case 99:
        return undefined;
      default:
        throw new Error('Encountered opcode ' + opcode);
    }
  }
}

async function executeChained(program: number[], sequence: number[]): Promise<number> {
  // Create the 5 programs we'll run
  const programs = [
    createProgram(program.slice(), 'A'),
    createProgram(program.slice(), 'B'),
    createProgram(program.slice(), 'C'),
    createProgram(program.slice(), 'D'),
    createProgram(program.slice(), 'E')
  ];
  let finalOutput = 0;

  // Seed each amplifier with its sequence number
  for (let i = 0; i < sequence.length; i++) {
    programs[i].input.push(sequence[i]);
  }

  // Initial value
  programs[0].input.push(0);

  // Hook up the inputs and outputs of each amplifier
  programs[0].output.receive = value => {
    programs[1].input.push(value);
  };
  programs[1].output.receive = value => {
    programs[2].input.push(value);
  };
  programs[2].output.receive = value => {
    programs[3].input.push(value);
  };
  programs[3].output.receive = value => {
    programs[4].input.push(value);
  };
  programs[4].output.receive = value => {
    finalOutput = value;
  };

  // Now run all programs in parallel
  await Promise.all(programs.map(program => program.runUntilHalted()));

  // The last output produced by the last amplifier is the answer
  return finalOutput;
}

async function executeFeedback(program: number[], sequence: number[]): Promise<number> {
  // Create the 5 programs we'll run
  const programs = [
    createProgram(program.slice(), 'A'),
    createProgram(program.slice(), 'B'),
    createProgram(program.slice(), 'C'),
    createProgram(program.slice(), 'D'),
    createProgram(program.slice(), 'E')
  ];
  let finalOutput = 0;

  // Seed each amplifier with its sequence number
  for (let i = 0; i < sequence.length; i++) {
    programs[i].input.push(sequence[i]);
  }

  // Initial value
  programs[0].input.push(0);

  // Hook up the inputs and outputs of each amplifier
  programs[0].output.receive = value => {
    programs[1].input.push(value);
  };
  programs[1].output.receive = value => {
    programs[2].input.push(value);
  };
  programs[2].output.receive = value => {
    programs[3].input.push(value);
  };
  programs[3].output.receive = value => {
    programs[4].input.push(value);
  };
  programs[4].output.receive = value => {
    programs[0].input.push(value);
    finalOutput = value;
  };

  // Now run all programs in parallel
  await Promise.all(programs.map(program => program.runUntilHalted()));

  // The last output produced by the last amplifier is the answer
  return finalOutput;
}

// Permute an array, using recursion
function getAllPermutations(list: number[]): number[][] {
  var results = [];

  if (list.length === 1) {
    results.push(list);
    return results;
  }

  for (var i = 0; i < list.length; i++) {
    var first = list[i];
    var left = list.slice(0, i).concat(list.slice(i + 1));
    var innerPermutations = getAllPermutations(left);
    for (var j = 0; j < innerPermutations.length; j++) {
      results.push([first].concat(innerPermutations[j]));
    }
  }

  return results;
}

async function findHighestAnswer(program: number[], sequence: number[], runner: Function): Promise<number> {
  let max = 0;

  for (let permutation of getAllPermutations(sequence)) {
    max = Math.max(max, await runner(program, permutation));
  }

  return max;
}

export async function solve(input: string[]): Promise<void> {
  //// Part 1 ////
  let program = input[0].split(',').map(s => parseInt(s, 10));
  let result1 = await findHighestAnswer(program, [0,1,2,3,4], executeChained);
  part1(result1);

  //// Part 2 ////
  let result2 = await findHighestAnswer(program, [5,6,7,8,9], executeFeedback);
  part2(result2);
};
