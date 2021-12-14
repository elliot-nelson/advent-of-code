// Year 2021 Day 14
// Extended Polymerization

import { ISolution } from '../../util';

type Polymer = {
    elements: Record<string, number>;
    pairs: Record<string, number>;
}

function step(polymer: Polymer, rules: Record<string, string>): Polymer {
    const newPolymer: Polymer = {
        elements: { ...polymer.elements },
        pairs: {}
    };

    for (const [input, output] of Object.entries(rules)) {
        if (!polymer.pairs[input]) continue;

        const leftSide: string = input[0] + output;
        const rightSide: string = output + input[1];
        newPolymer.elements[output] = (newPolymer.elements[output] || 0) + polymer.pairs[input];
        newPolymer.pairs[leftSide] = (newPolymer.pairs[leftSide] || 0) + polymer.pairs[input];
        newPolymer.pairs[rightSide] = (newPolymer.pairs[rightSide] || 0) + polymer.pairs[input];
    }

    return newPolymer;
}

export function solve(input: string[]): ISolution<number> {
    const sections: string[] = input.join('\n').split('\n\n');
    const rules: Record<string, string> = Object.fromEntries(sections[1].split('\n').map(line => {
        return line.split(' -> ');
    }));

    const originalPolymer: Polymer = {
        elements: [...sections[0]].reduce((hash, letter) => {
            hash[letter] = (hash[letter] || 0) + 1;
            return hash;
        }, {}),
        pairs: [...sections[0]].reduce((hash, letter, idx, array) => {
            if (idx < array.length - 1) {
                let pair: string = array[idx] + array[idx + 1];
                hash[pair] = (hash[pair] || 0) + 1;
            }
            return hash;
        }, {})
    };

    // Step 1
    let polymer: Polymer = originalPolymer;
    for (let i = 0; i < 10; i++) polymer = step(polymer, rules);
    const part1: number = Math.max(...Object.values(polymer.elements)) - Math.min(...Object.values(polymer.elements));

    // Step 2
    polymer = originalPolymer;
    for (let i = 0; i < 40; i++) polymer = step(polymer, rules);
    const part2: number = Math.max(...Object.values(polymer.elements)) - Math.min(...Object.values(polymer.elements));

    return { part1, part2 };
}
