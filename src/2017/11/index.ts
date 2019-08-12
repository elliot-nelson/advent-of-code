// ------------------------------------------------------------------------
// Year 2017 Day 11
// ------------------------------------------------------------------------
import { log } from '../../util';

// This puzzle involves either a little prior knowledge or a lot of ingenuity,
// I had the former.
//
// My solution uses axial coordinates (q/r) to track the position in the hexagonal
// grid, and then converts to cube coordinates to compute manhattan distance. For
// a definitive resource on hexagonal grids check out https://www.redblobgames.com/grids/hexagons/
// (and read the rest of his articles too!)

type Point = { q: number, r: number };

function parse(input: string): string[] {
  return input.split(',');
}

function vector(direction: string): Point {
  switch (direction) {
    case 'n': return { q: -1, r: 0 };
    case 's': return { q: 1, r: 0 };
    case 'ne': return { q: 0, r: -1 };
    case 'sw': return { q: 0, r: 1 };
    case 'nw': return { q: -1, r: 1 };
    case 'se': return { q: 1, r: -1 };
  }
}

function followDirections(start: Point, directions: string[]) {
  let p = start;
  let maxDistance = 0;
  for (let direction of directions) {
    let v = vector(direction);
    p = { q: p.q + v.q, r: p.r + v.r };
    maxDistance = Math.max(maxDistance, manhattanDistance(start, p));
  }
  return { p, maxDistance };
}

function manhattanDistance(a: Point, b: Point): number {
  let ac = { x: a.q, y: a.r, z: -a.q-a.r };
  let bc = { x: b.q, y: b.r, z: -b.q-b.r };
  return (Math.abs(bc.x - ac.x) + Math.abs(bc.y - ac.y) + Math.abs(bc.z - ac.z)) / 2;
}

export function solve(input: string[]) {
  let directions = parse(input[0]);

  //// Part 1 ////
  let start = { q: 0, r: 0 };
  let result = followDirections(start, directions);
  let result1 = manhattanDistance(start, result.p);
  log.part1(result1);

  //// Part 2 ////
  let result2 = result.maxDistance;
  log.part2(result2);
};
