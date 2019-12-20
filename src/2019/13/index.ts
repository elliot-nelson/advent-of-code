// ------------------------------------------------------------------------
// Year 2019 Day 13
// ------------------------------------------------------------------------
import { p, part1, part2, fill2d, draw } from '../../util';

const chalk = require('chalk');
const logUpdate = require('log-update');

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
  memory: number[];
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
    memory: program,
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

function find(map: number[][], thing: number) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === thing) return [x, y];
    }
  }
}

async function execute(program: Program, initialPanelColor: number) {
  let panels = {};
  let pos = [0, 0];
  let facing = 0;
  let dir = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]
  ];
  let max = [0, 0];
  let mode = 0;

  let map = [];
  let x = 0, y = 0, tile = 0, score = 0;

  // The initial panel color we start on
  panels[String(pos)] = initialPanelColor;

  let lastBall = undefined;

  // Override the "read" input to return the color of the panel below us
  program.input.next = async function () {
    let paddle = find(map, 3);
    let ball = find(map, 4);
    let vel = [0, 0];
    let result = 0;

    if (lastBall) {
      if (ball[0] < lastBall[0]) {
        vel[0] = -1;
      } else {
        vel[0] = 1;
      }
      if (ball[1] < lastBall[1]) {
        vel[1] = -1;
      } else {
        vel[1] = 1;
      }

      vel[0] = 0;
      vel[1] = 0;
      if (paddle[0] < ball[0] + vel[0]) {
        result = 1;
      } else if (paddle[0] > ball[0] + vel[0]) {
        result = -1;
      }
    }

    lastBall = ball;

    let board = draw(map, [' ', chalk.white('#'), chalk.grey('-'), chalk.blue('='), chalk.red('@')]);
    logUpdate(renderScore(board, score));
    await new Promise(resolve => setTimeout(resolve, 2));

    return result;
  };

  // Override the "receive" output to act on the output
  program.output.receive = value => {
    switch (mode) {
      case 0:
        x = value;
        mode++;
        break;
      case 1:
        y = value;
        mode++;
        break;
      case 2:
        tile = value;
        mode = 0;

        if (x === -1 && y === 0) {
          score = value;
        } else {
          map[y] = map[y] || [];
          map[y][x] = tile;
        }

        break;
    }
  };

  // Run to completion
  await program.runUntilHalted();

  let board = draw(map, [' ', chalk.white('#'), chalk.grey('-'), chalk.blue('='), chalk.red('@')]);
  logUpdate(renderScore(board, score));
  await new Promise(resolve => setTimeout(resolve, 2));

  // The Count is for part 1.
  let count = 0;
  for (y = 0; y < map.length; y++) {
    if (map[y] === undefined) map[y] = [];
    for (x = 0; x < map[y].length; x++) {
      if (map[y][x] === undefined) map[y][x] = 0;
      if (map[y][x] === 2) count++;
    }
  }
  return count;
}

function renderScore(board: string, score: number) {
  return board + '\n' + chalk.yellow.bold('              * ' + score + ' *') + '\n';
}

export async function solve(input: string[]): Promise<void> {
  //// Part 1 ////
  let program = createProgram(input[0].split(',').map(s => parseInt(s, 10)), 'program');
  let result1 = await execute(program, 0);
  logUpdate.done();
  part1(result1);

  //// Part 2 ////
  program = createProgram(input[0].split(',').map(s => parseInt(s, 10)), 'program');
  program.memory[0] = 2;
  let result2 = await execute(program, 1);
  await new Promise(resolve => setTimeout(resolve, 2000));
  logUpdate.done();
  part2(result2);
};
