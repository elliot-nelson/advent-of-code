// ------------------------------------------------------------------------
// Year 2019 Day 06
// ------------------------------------------------------------------------
import { p, part1, part2 } from '../../util';

type OrbitMap = Record<string, string>;
type Result = { direct: number, indirect: number };

function parseInput(input: string[]): OrbitMap {
  let orbits = {};

  input.forEach(line => {
    let k = line.split(')');
    orbits[k[1]] = k[0];
  });

  return orbits;
}

function countOrbits(orbits: OrbitMap): Result {
  let direct = 0, indirect = 0;

  for (let planet of Object.keys(orbits)) {
    direct++;
    while ((planet = orbits[planet])) {
      indirect++;
    }
  }

  return { direct, indirect };
}

function traverse(orbits: OrbitMap, start: string): string[] {
  let path = [];
  let node = orbits[start];

  for (;;) {
    path.push(node);
    node = orbits[node];
    if (!node) return path;
  }
}

function minimumTransfers(orbits: OrbitMap): number {
  let a = traverse(orbits, 'YOU');
  let b = traverse(orbits, 'SAN');
  let split = 0;

  a.reverse();
  b.reverse();

  for (;;) {
    split++;
    if (a[split] !== b[split]) break;
  }

  return a.length + b.length - split * 2;
}

export function solve(input: string[]): void {
  //// Part 1 ////
  let orbits = parseInput(input);
  let result1 = countOrbits(orbits);
  part1(result1.indirect);

  //// Part 2 ////
  let result2 = minimumTransfers(orbits);
  part2(result2);
};
