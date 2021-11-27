// ------------------------------------------------------------------------
// Year 2017 Day 13
//
// Part 1: Got lucky and coded up a basically working solution on first
// try. Fast solve for Part 1.
//
// Part 2: Quickly wrote up the additional logic, but discovered I had
// some logic errors in Part 1 (some of my loop conditions were incorrect
// and caused wrong answers). Unfortunately, after fixing my logic errors,
// I realized that this was intended to be an optimization puzzle.
//
// After flailing uselessly for like 15 minutes, I finally realized I
// wanted to abandon the simulation altogether and turn it into a
// computation instead. After some bug fixing was able to solve it in
// about 12 seconds runtime.
// ------------------------------------------------------------------------
import { log } from '../../util';

interface State {
  layers: number[];
  scanners: number[];
  direction: number[];
  position: number;
}

interface Result {
  caught: boolean;
  cost: number;
}

function buildState(input: string[], delay: number): State {
  const state = {
    layers: [],
    scanners: [],
    direction: [],
    position: 0 - delay - 1
  };

  input.forEach(line => {
    let [layer, depth] = line.split(': ').map(s => parseInt(s, 10));
    state.layers[layer] = depth;
    state.direction[layer] = 1;
    state.scanners[layer] = 0;
  });

  return state;
}

function resetState(state: State, delay: number): void {
  for (let i = 0; i < state.layers.length; i++) {
    if (state.scanners[i] !== undefined) {
      state.scanners[i] = 0;
      state.direction[i] = 1;
    }
  }
  state.position = 0 - delay - 1;
}

function moveScanners(state: State): void {
  for (let i = 0; i < state.scanners.length; i++) {
    if (state.scanners[i] !== undefined) {
      state.scanners[i] = (state.scanners[i] + state.direction[i]);
      if (state.direction[i] > 0 && state.scanners[i] === state.layers[i] - 1 ||
          state.direction[i] < 0 && state.scanners[i] === 0) {
        state.direction[i] = -state.direction[i];
      }
    }
  }
}

// This is a "simulation" of the puzzle, good enough for Part 1
function traverseFirewall(state: State): Result {
  let cost = 0, caught = false;

  for (;;) {
    state.position++;
    if (state.position === state.layers.length) break;

    if (state.position >= 0) {
      if (state.scanners[state.position] === 0) {
        cost += state.position * state.layers[state.position];
        caught = true;
      }
    }

    moveScanners(state);
  }

  return { caught, cost };
}

// The fast (computation) version, which uses the interval of each
// scanner (i.e. range minus one times two).
function traverseFirewallFast(state, delay) {
  let cost = 0, caught = false;

  for (let i = 0; i < state.layers.length; i++) {
    if (state.layers[i] !== undefined) {
      if ((i + delay) % ((state.layers[i] - 1) * 2) === 0) {
        cost += i * state.layers[i];
        caught = true;
      }
    }
  }

  return { cost, caught };
}

function computeSmallestDelay(input: string[]): number {
  let delay = 0;
  let state = buildState(input, 0);

  for (;;) {
    // The "reset state" function was added to avoid processing
    // the array of input strings in the inner loop.
    resetState(state, delay);
    let result = traverseFirewallFast(state, delay);
    if (!result.caught) return delay;
    delay++;
  }
}

export function solve(input: string[]) {
  //// Part 1 ////
  let state = buildState(input, 0);
  let result1 = traverseFirewall(state).cost;
  log.part1(result1);

  //// Part 2 ////
  let result2 = computeSmallestDelay(input);
  log.part2(result2);
};
