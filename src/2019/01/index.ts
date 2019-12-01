// ------------------------------------------------------------------------
// Year 2019 Day 01
//
// Part 1: Straightforward reading comprehension.
//
// Part 2: More reading comprehension (which, unfortunately, I failed at
// the first time around). It's important to calculate the cost of the
// additional fuel on a per-module basis and not over the sum of all
// modules, which produces a slightly higher answer. This would have
// shaved an extra couple minutes off my time.
//
// Notes: It's Day 1! No real computational pitfalls or tricky strategies
// needed here.
// ------------------------------------------------------------------------
import { p, part1, part2 } from '../../util';

interface Result {
  raw: number;
  total: number;
}

function fuelToLaunch(mass: number): number {
  return Math.floor(mass / 3) - 2;
}

function totalFuelToLaunch(mass: number): number {
  let addl = fuelToLaunch(mass), sum = 0;
  while (addl >= 0) {
    sum += addl;
    addl = fuelToLaunch(addl);
  }
  return sum;
}

function calculateFuel(modules: number[]): Result {
  let raw = 0, total = 0;
  for (let m of modules) {
    raw += fuelToLaunch(m);
    total += totalFuelToLaunch(m);
  }
  return { raw, total };
}

export function solve(input: string[]): void {
  //// Part 1 ////
  let modules = input.map(line => parseInt(line, 10));
  let result = calculateFuel(modules);
  let result1 = result.raw;
  part1(result1);

  //// Part 2 ////
  let result2 = result.total;
  part2(result2);
};
