// ------------------------------------------------------------------------
// Year 2018 Day 14
//
// For Part 1, I lost a minute on "for in" vs "for of" (sigh). Then I tried
// to submit my answers with spaces several times, rather than as a solid
// integer block (another sigh).
//
// Part 2 stumped me because my implementation was too slow - then I
// improved it and ran out of memory while running it. I tried converting
// from a number array to a string scoreboard and that was a big mistake
// (WAY too slow - order of magnitude slower than the array). The lightbulb
// was to take advantage of the fact that the sum each round will be less
// than 20, putting some specialized logic in there dropped Part 2 from
// multiple minutes to a few seconds (no more parseInts or charCodeAts).
// Also note running many rounds before checking - the check is slower
// than the computation, so you want to do a million or so rounds between
// each check.
// ------------------------------------------------------------------------
import { log } from '../../util';

function performRound(scoreboard: number[], current: number[]): void {
  let sum = scoreboard[current[0]] + scoreboard[current[1]];

  // Naive (slow, memory-intensive) version:
  //   for (digit of String(sum).split('').map(s => parseInt(s, 10))) { }

  // Cheat version:
  if (sum >= 10) scoreboard.push(1);
  scoreboard.push(sum % 10);

  for (let elf = 0; elf < 2; elf++) {
    let movement = scoreboard[current[elf]] + 1;
    current[elf] = (current[elf] + movement) % scoreboard.length;
  }
}

function findTenAfter(scoreboard: number[], current: number[], rounds: number): number[] {
  while (scoreboard.length < rounds + 10) {
    performRound(scoreboard, current);
  }
  return scoreboard.slice(rounds, rounds + 10);
}

function findToLeft(scoreboard: number[], current: number[], sequence: number): number {
  for(;;) {
    for (let i = 0; i < 1000000; i++) performRound(scoreboard, current);

    let index = scoreboard.join('').indexOf(String(sequence));
    if (index >= 0) return index;
  }
}

export function solve(input: string[]) {
  //// Part 1 ////
  let scoreboard = [3, 7];
  let current = [0, 1];
  let rounds = parseInt(input[0], 10);
  let result1 = findTenAfter(scoreboard, current, rounds);
  log.part1(result1.join(''));

  //// Part 2 ////
  scoreboard = [3, 7];
  current = [0, 1];
  let result2 = findToLeft(scoreboard, current, rounds);
  log.part2(result2);
};
