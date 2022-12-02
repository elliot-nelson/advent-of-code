// Year 2022 Day 02
// Rock Paper Scissors

import { ISolution } from '../../util';

const goalTable: Record<string, string> = {
    'AX': 'Z',
    'AY': 'X',
    'AZ': 'Y',
    'BX': 'X',
    'BY': 'Y',
    'BZ': 'Z',
    'CX': 'Y',
    'CY': 'Z',
    'CZ': 'X'
};

const choiceScoreTable: Record<string, number> = {
    'X': 1,
    'Y': 2,
    'Z': 3
};

const outcomeScoreTable: Record<string, number> = {
    'AX': 3,
    'BY': 3,
    'CZ': 3,
    'AY': 6,
    'BZ': 6,
    'CX': 6,
    'AZ': 0,
    'BX': 0,
    'CY': 0
};

function roundScore(opponent: string, you: string): number {
    return choiceScoreTable[you] + outcomeScoreTable[opponent + you];
}

export function solve(input: string[]): ISolution<number> {
    const guide: string[][] = input.map(line => line.split(' '));

    // Part 1
    const part1 = guide.map(round => roundScore(round[0], round[1])).reduce((sum, value) => sum + value);

    // Part 2
    const part2 = guide.map(round => roundScore(round[0], goalTable[round[0] + round[1]])).reduce((sum, value) => sum + value);

    return { part1, part2 };
}
