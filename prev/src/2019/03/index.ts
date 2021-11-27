// ------------------------------------------------------------------------
// Year 2019 Day 03
//
// Part 1: I got hammered by storage here... I still haven't figured out
// a good way, in javascript, to use coordinates as keys (in sets or maps).
// I'll need to keep noodling on this one.
//
// Part 2: The code wasn't too bad, but I had a typo in a sort that added
// five minutes of debugging. Oh well!
// ------------------------------------------------------------------------
import { p, part1, part2 } from '../../util';

const DIRECTIONS = {
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
  U: { x: 0, y: -1 },
  D: { x: 0, y: 1 }
};

function parseInput(input) {
  return input.map(line => line.split(',').map(str => {
    return {
      dir: str[0],
      dist: parseInt(str.substring(1), 10)
    };
  }));
}

function traceWire(wire) {
  const visited = {};
  let x = 0, y = 0, steps = 0;
  visited[`${x},${y}`] = [0];
  for (const w of wire) {
    for (let i = 0; i < w.dist; i++) {
      steps += 1;
      x += DIRECTIONS[w.dir].x;
      y += DIRECTIONS[w.dir].y;
      let k = `${x},${y}`;
      visited[k] = visited[k] || [];
      visited[k].push(steps);
    }
  }
  return visited;
}

function closestIntersection(trace1, trace2) {
  let possible = Object.keys(trace1).filter(k => trace2[k]);
  let costs: any[] = possible.map(key => [key, key.split(',').map(x => parseInt(x, 10)).reduce((sum, x) => sum + Math.abs(x), 0)]);
  costs.sort((a, b) => a[1] - b[1]);

  return costs[1][1];
}

function earliestIntersection(trace1, trace2) {
  let possible = Object.keys(trace1).filter(k => trace2[k]);
  let costs: any[] = possible.map(key => [key, trace1[key][0] + trace2[key][0]]);
  costs.sort((a, b) => a[1] - b[1]);

  return costs[1][1];
}

export function solve(input: string[]): void {
  //// Part 1 ////
  let wires = parseInput(input);
  let traces = wires.map(traceWire);
  let result1 = closestIntersection(traces[0], traces[1]);
  part1(result1);

  //// Part 2 ////
  let result2 = earliestIntersection(traces[0], traces[1]);
  part2(result2);
};
