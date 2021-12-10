// Year 2021 Day 10
// Syntax Scoring

import { ISolution } from '../../util';

// Type representation for a parsed Line

enum State {
    VALID,
    CORRUPTED,
    INCOMPLETE
}
type ValidLine = {
    state: State.VALID;
}
type CorruptedLine = {
    state: State.CORRUPTED;
    corruptedChar: string;
}
type IncompleteLine = {
    state: State.INCOMPLETE;
    completion: string;
}
type Line = ValidLine | CorruptedLine | IncompleteLine;

// Parser configuration

const OPEN_MAP: Record<string, string> = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
};
const CLOSE_MAP: Record<string, string> = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<'
};

// Parser

function corruptedScore(corruptedChar: string): number {
    const CORRUPTED_SCORE: Record<string, number> = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    };
    return CORRUPTED_SCORE[corruptedChar] || 0;
}

function completionScore(completion: string): number {
    const COMPLETION_SCORE: Record<string, number> = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4
    };
    let score = 0;
    for (const c of completion) {
        score = (score * 5) + (COMPLETION_SCORE[c] || 0);
    }
    return score;
}

function parseLine(line: string): Line {
    const stack: string[] = [];

    for (const c of line) {
        if (OPEN_MAP[c]) {
            stack.push(c);
        } else {
            let last = stack.pop();
            if (CLOSE_MAP[c] !== last) return { state: State.CORRUPTED, corruptedChar: c };
        }
    }

    let completion: string = '';
    while (stack.length > 0) {
        completion += OPEN_MAP[stack.pop()!];
    }

    if (completion.length > 0) {
        return { state: State.INCOMPLETE, completion };
    } else {
        // According to the puzzle there are NO valid lines, but just for kicks!
        return { state: State.VALID };
    }
}

export function solve(input: string[]): ISolution<number> {
    const lines: Line[] = input.map(parseLine);

    // Part 1
    const corruptedScores: number[] = lines
        .filter((line): line is CorruptedLine => line.state === State.CORRUPTED)
        .map(line => corruptedScore(line.corruptedChar));
    const part1: number = corruptedScores.reduce((sum, value) => sum + value, 0);

    // Part 2
    const incompleteScores: number[] = lines
        .filter((line): line is IncompleteLine => line.state === State.INCOMPLETE)
        .map(line => completionScore(line.completion));
    const part2: number = incompleteScores.sort((a, b) => a - b)[Math.floor(incompleteScores.length / 2)];

    return { part1, part2 };
}
