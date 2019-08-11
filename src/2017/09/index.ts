// ------------------------------------------------------------------------
// Year 2017 Day 09
// ------------------------------------------------------------------------
import { log } from '../../util';

function parse(input: string): any[] {
  let state = 'group';
  let stack: any[] = [[]];

  for (let c of input) {
    let top = stack[stack.length - 1];

    switch (state) {
      case 'group':
        if (c === '{') {
          let group = [];
          top.push(group);
          stack.push(group);
        } else if (c === '}') {
          stack.pop();
        } else if (c === '<') {
          state = 'garbage';
          stack.push('');
        }
        break;
      case 'garbage':
        if (c === '>') {
          stack.pop();
          stack[stack.length - 1].push(top);
          state = 'group';
        } else if (c === '!') {
          state = 'cancel';
        } else {
          stack[stack.length - 1] += c;
        }
        break;
      case 'cancel':
        state = 'garbage';
        break;
    }
  }

  return stack[0][0];
}

function computeScore(group: any[], level: number): number {
  let score = level;
  for (let subgroup of group) {
    if (Array.isArray(subgroup)) {
      score += computeScore(subgroup, level + 1);
    }
  }
  return score;
}

function computeGarbageChars(group: any[]): number {
  let chars = 0;
  for (let subgroup of group) {
    if (Array.isArray(subgroup)) {
      chars += computeGarbageChars(subgroup);
    } else {
      chars += subgroup.length;
    }
  }
  return chars;
}

export function solve(input: string[]) {
  //// Part 1 ////
  let groups = parse(input[0]);
  let result1 = computeScore(groups, 1);
  log.part1(result1);

  //// Part 2 ////
  let result2 = computeGarbageChars(groups);
  log.part2(result2);
};
