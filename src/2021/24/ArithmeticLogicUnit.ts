// Year 2021 Day 24
// Arithmetic Logic Unit

import { ISolution } from '../../util';

type Instruction = {
    op: string;
    lvar: string;
    rvar?: string;
    rvalue?: number;
}

type Register = {
    w: number;
    x: number;
    y: number;
    z: number;
}

enum ScuzzMode {
    HIGHEST,
    LOWEST
}

function execute(program: Instruction[], inputs: number[]): Register {
    const vars: Register = {
        w: 0,
        x: 0,
        y: 0,
        z: 0
    };
    inputs = [...inputs];

    // Program
    for (let instr of program) {
        switch (instr.op) {
            case 'inp':
                vars[instr.lvar] = inputs.shift()!;
                break;
            case 'add':
                vars[instr.lvar] += instr.rvar ? vars[instr.rvar] : instr.rvalue!;
                break;
            case 'mul':
                vars[instr.lvar] *= instr.rvar ? vars[instr.rvar] : instr.rvalue!;
                break;
            case 'div':
                vars[instr.lvar] = Math.floor(vars[instr.lvar] / (instr.rvar ? vars[instr.rvar] : instr.rvalue!));
                break;
            case 'mod':
                vars[instr.lvar] %= instr.rvar ? vars[instr.rvar] : instr.rvalue!;
                break;
            case 'eql':
                vars[instr.lvar] = (vars[instr.lvar] === (instr.rvar ? vars[instr.rvar] : instr.rvalue!) ? 1 : 0);
                break;
        }
    }

    return vars;
}

function digit(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function findValidModelNumber(program: Instruction[]): number[] {
    let best: number[] = [];
    let bestZ: number = Infinity;

    // Start by generating 1,000 totally random model numbers, and
    // picking the one with the lowest Z value.
    for (let i = 0; i < 1_000; i++) {
        const digits = Array(14).fill(0).map(() => digit(1, 9));
        const result = execute(program, digits);
        if (result.z < bestZ) {
            bestZ = result.z;
            best = digits;
        }
    }

    // Now we start scuzzing the best model number we have, picking
    // model numbers close to it and looking for a lower Z value.
    while (bestZ > 0) {
        let bestLocal: number[] = best;
        let bestLocalZ: number = Infinity;

        // Each scuzz pass generates 1,000 new model numbers, where each digit
        // has a 50% chance to be randomized or retain the best digit.
        for (let i = 0; i < 1_000; i++) {
            const digits = Array(14).fill(0).map((x, idx) => Math.random() < 0.5 ? best[idx] : digit(1, 9));
            const result = execute(program, digits);
            if (result.z < bestLocalZ) {
                bestLocalZ = result.z;
                bestLocal = digits;
            }
        }

        // If we've found a better Z value out of those 1,000 scuzzes, pick a new
        // "baseline" model number to scuzz next.
        if (bestLocalZ < bestZ) {
            bestZ = bestLocalZ;
            best = bestLocal;
        }

        if (bestZ === 0) break;
    }

    return best;
}

function findNewModelNumber(program: Instruction[], baseline: number[], mode: ScuzzMode): number[] {
    let encounters: number = 0;

    // Continually scuzz our model number, picking a new baseline every time we find a
    // valid number, but only going "up" (for higher) or "down" (for lower).
    //
    // If we encounter the same valid model number 25 times in a row without finding a
    // better one, we can feel confident that we have found the best model number.
    while (encounters < 25) {
        const digits = Array(14).fill(0).map((x, idx) => {
            if (Math.random() < 0.33) {
                return baseline[idx];
            } else {
                return mode === ScuzzMode.HIGHEST ? digit(baseline[idx], 9) : digit(1, baseline[idx]);
            }
        });
        const result = execute(program, digits);
        if (result.z === 0) {
            const a = Number(digits.join('')), b = Number(baseline.join(''));
            if (mode === ScuzzMode.HIGHEST ? a > b : a < b) {
                baseline = digits;
                encounters = 0;
            } else if (a === b) {
                encounters++;
            }
        }
    }

    return baseline;
}

export function solve(input: string[]): ISolution<number> {
    // Parse input program
    const program: Instruction[] = input.map(line => {
        const elements = line.split(' ');
        if (elements.length === 2) {
            return {
                op: elements[0],
                lvar: elements[1]
            };
        } else if (['w', 'x', 'y', 'z'].includes(elements[2])) {
            return {
                op: elements[0],
                lvar: elements[1],
                rvar: elements[2]
            };
        } else {
            return {
                op: elements[0],
                lvar: elements[1],
                rvalue: Number(elements[2])
            };
        }
    });

    // Use program to find any valid model number
    const validNumber: number[] = findValidModelNumber(program);

    // Part 1
    let model: number[] = validNumber;
    for (;;) {
        // The scuzzed model number generally finds the best possible answer about 80% of the time,
        // but we can bring that to nearly 100% by repeating until we don't find a better answer.
        let newModel: number[] = findNewModelNumber(program, validNumber, ScuzzMode.HIGHEST);
        if (newModel.join('') === model.join('')) break;
        model = newModel;
    }
    const part1: number = Number(model.join(''));

    // Part 2
    model = validNumber;
    for (;;) {
        // The scuzzed model number generally finds the best possible answer about 80% of the time,
        // but we can bring that to nearly 100% by repeating until we don't find a better answer.
        let newModel: number[] = findNewModelNumber(program, validNumber, ScuzzMode.LOWEST);
        if (newModel.join('') === model.join('')) break;
        model = newModel;
    }
    const part2: number = Number(model.join(''));

    return { part1, part2 };
}
