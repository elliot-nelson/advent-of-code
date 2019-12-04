// ------------------------------------------------------------------------
// Year 2019 Day 04
//
// Part 1: Straightforward speed run.
//
// Part 2: Intentionally sloppy out-of-range array accesses make Part 2
// a breeze.
// ------------------------------------------------------------------------
import { p, part1, part2 } from '../../util';

function validPart1(number: number): boolean {
  let digits = String(number);
  let increasing = true;
  let double = false;
  for (let i = 0; i < digits.length - 1; i++) {
    if (digits[i] > digits[i + 1]) increasing = false;
    if (digits[i] === digits[i + 1]) double = true;
  }
  return double && increasing;
}

function validPart2(number: number): boolean {
  let digits = String(number);
  let increasing = true;
  let double = false;
  for (let i = 0; i < digits.length - 1; i++) {
    if (digits[i] > digits[i + 1]) increasing = false;
    if (digits[i] === digits[i + 1] && digits[i] !== digits[i - 1] && digits[i] !== digits[i + 2]) double = true;
  }
  return double && increasing;
}

function count(range: number[], validator: (number: number) => boolean): number {
  let result = 0;
  for (let number = range[0]; number <= range[1]; number++) {
    if (validator(number)) result++;
  }
  return result;
}

export function solve(input: string[]): void {
  //// Part 1 ////
  let range = input[0].split('-').map(x => parseInt(x, 10));
  let result1 = count(range, validPart1);
  part1(result1);

  //// Part 2 ////
  let result2 = count(range, validPart2);
  part2(result2);
};
