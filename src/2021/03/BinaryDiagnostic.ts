// Year 2021 Day 03
// Binary Diagnostic

import { ISolution } from '../../util';

function filterOnBit(list: number[], bit: number, highest: boolean): number[] {
    let counts = [0, 0];
    for (let i = 0; i < list.length; i++) counts[(list[i] >> bit) & 1]++;

    let criteria: number = counts[0] > counts[1] ? (highest ? 0 : 1) : (highest ? 1 : 0);
    return list.filter(entry => ((entry >> bit) & 1) === criteria);
}

export function solve(input: string[]): ISolution<number> {
    const bits = input[0].length;
    const numbers = input.map(line => parseInt(line, 2));

    // Part 1
    let gamma: number = 0;
    let epsilon: number = 0;
    for (let bit = bits - 1; bit >= 0; bit--) {
        let counts = [0, 0];
        for (let i = 0; i < input.length; i++) counts[(numbers[i] >> bit) & 1]++;
        gamma += (counts[0] > counts[1] ? 0 : 1) << bit;
        epsilon += (counts[0] > counts[1] ? 1 : 0) << bit;
    }

    const part1 = gamma * epsilon;

    // Part 2
    let oxygenList = [...numbers];
    for (let bit = bits - 1; oxygenList.length > 1; bit--) {
        oxygenList = filterOnBit(oxygenList, bit, true);
    }
    let oxygen = oxygenList[0];

    let co2List = [...numbers];
    for (let bit = bits - 1; co2List.length > 1; bit--) {
        co2List = filterOnBit(co2List, bit, false);
    }
    let co2 = co2List[0];

    const part2 = oxygen * co2;

    return { part1, part2 };
}
