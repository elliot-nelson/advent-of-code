// Year 2021 Day 03
// Binary Diagnostic

import { ISolution } from '../../util';

function filterOnBit(list: string[], bit: number, highest: boolean): string[] {
    let counts = { '0': 0, '1': 0 };
    for (let i = 0; i < list.length; i++) counts[list[i][bit]]++;

    let criteria = counts['0'] > counts['1'] ? (highest ? '0' : '1') : (highest ? '1' : '0');
    return list.filter(entry => entry[bit] === criteria);
}

export function solve(input: string[]): ISolution<number> {

    // Part 1
    let gammaString = '';
    let epsilonString = '';
    for (let bit = 0; bit < input[0].length; bit++) {
        let counts = { '0': 0, '1': 0 };
        for (let i = 0; i < input.length; i++) counts[input[i][bit]]++;
        gammaString += counts['0'] > counts['1'] ? '0' : '1';
        epsilonString += counts['0'] > counts['1'] ? '1' : '0';
    }
    let gamma = parseInt(gammaString, 2);
    let epsilon = parseInt(epsilonString, 2);

    const part1 = gamma * epsilon;

    // Part 2
    let oxygenList = [...input];
    for (let bit = 0; oxygenList.length > 1; bit++) {
        oxygenList = filterOnBit(oxygenList, bit, true);
    }
    let oxygen = parseInt(oxygenList[0], 2);

    let co2List = [...input];
    for (let bit = 0; co2List.length > 1; bit++) {
        co2List = filterOnBit(co2List, bit, false);
    }
    let co2 = parseInt(co2List[0], 2);

    const part2 = oxygen * co2;

    return { part1, part2 };
}
