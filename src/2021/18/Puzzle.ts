// Year 2021 Day 18
// Snailfish

import { ISolution } from '../../util';

type Token = {
    token?: string;
    value?: number;
}

function parseTokens(snailfish: string): Token[] {
    const tokens: Token[] = [];

    for (let idx = 0; idx < snailfish.length; idx++) {
        let s: string = snailfish[idx];
        if (s === '[' || s === ']' || s === ',') {
            tokens.push({ token: s });
        } else {
            while (snailfish[idx + 1].match(/\d/)) {
                s += snailfish[++idx];
            }
            tokens.push({ value: Number(s) });
        }
    }

    return tokens;
}

function reduce(tokens: Token[]): Token[] {
    let step: number = 0;

    while (step < 2) {
        step++;

        let level: number = 0;
        let sideStack: number[] = [0];

        for (let idx = 0; idx < tokens.length; idx++) {
            if (tokens[idx].token === '[') {
                level++;
                sideStack.push(0);
            } else if (tokens[idx].token === ']') {
                level--;
                sideStack.pop();
            } else if (tokens[idx].token === ',') {
                sideStack[sideStack.length - 1]++;
            } else {
                if (step === 1 && level >= 5 && tokens[idx + 1].token === ',' && !tokens[idx + 2].token) {
                    let [leftSide, rightSide] = [tokens[idx].value!, tokens[idx + 2].value!];
                    for (let i = idx - 1; i >= 0; i--) {
                        if (!tokens[i].token) {
                            tokens[i] = { value: tokens[i].value! + leftSide };
                            break;
                        }
                    }
                    for (let i = idx + 3; i < tokens.length; i++) {
                        if (!tokens[i].token) {
                            tokens[i] = { value: tokens[i].value! + rightSide };
                            break;
                        }
                    }
                    tokens = [
                        ...tokens.slice(0, idx - 1),
                        { value: 0 },
                        ...tokens.slice(idx + 4)
                    ];
                    step = 0;
                    break;
                }
                if (step === 2 && tokens[idx].value! >= 10) {
                    tokens = [
                        ...tokens.slice(0, idx),
                        { token: '[' },
                        { value: Math.floor(tokens[idx].value! / 2) },
                        { token: ',' },
                        { value: Math.ceil(tokens[idx].value! / 2) },
                        { token: ']' },
                        ...tokens.slice(idx + 1)
                    ];
                    step = 0;
                    break;
                }
            }
        }
    }

    return tokens;
}

function add(a: Token[], b: Token[]): Token[] {
    let c: Token[] = [
        { token: '[' },
        ...a,
        { token: ',' },
        ...b,
        { token: ']' }
    ];
    return reduce(c);
}

function magnitude(tokens: Token[]): number {
    let stack: number[] = [];
    let sideStack: number[] = [];

    let multiplier: Record<number, number> = {
        0: 3,
        1: 2
    };

    for (let idx = 0; idx < tokens.length; idx++) {
        if (tokens[idx].token === '[') {
            stack.push(0);
            sideStack.push(0);
        } else if (tokens[idx].token === ']') {
            sideStack.pop();
            let value: number = stack.pop()!;
            if (stack.length === 0) return value;
            stack[stack.length - 1] += multiplier[sideStack[sideStack.length - 1]] * value;
        } else if (tokens[idx].token === ',') {
            sideStack[sideStack.length - 1]++;
        } else {
            stack[stack.length - 1] += tokens[idx].value! * multiplier[sideStack[sideStack.length - 1]];
        }
    }

    return 0;
}

export function solve(input: string[]): ISolution<number> {
    const snailfishNumbers: Token[][] = input.map(parseTokens);

    // Part 1
    let result = snailfishNumbers.reduce((a, b) => add(a, b));
    const part1: number = magnitude(result);

    // Part 2
    let max: number = 0;
    for (let i = 0; i < snailfishNumbers.length; i++) {
        for (let j = 0; j < snailfishNumbers.length; j++) {
            if (i === j) continue;
            let value = magnitude(add(snailfishNumbers[i], snailfishNumbers[j]));
            if (value > max) max = value;
        }
    }
    const part2 = max;

    return { part1, part2 };
}
