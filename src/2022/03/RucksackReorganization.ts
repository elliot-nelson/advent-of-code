// Year 2022 Day 03
// Rucksack Reorganization

import { ISolution, Util } from '../../util';

function itemPriority(item: string): number {
    if (item >= 'a' && item <= 'z') {
        return item.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    } else {
        return item.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
    }
}

function matchingItem(a: string, b?: string, c?: string): string {
    for (let i = 0; i < a.length; i++) {
        if (b && !b.includes(a[i])) continue;
        if (c && !c.includes(a[i])) continue;

        return a[i];
    }

    return '';
}

export function solve(input: string[]): ISolution<number> {
    // Part 1
    const part1 = input
        .map(rucksack => matchingItem(rucksack.slice(0, rucksack.length / 2), rucksack.slice(rucksack.length / 2)))
        .map(item => itemPriority(item))
        .reduce((sum, value) => sum + value);

    // Part 2
    const part2 = Util.group(input, 3)
        .map(sacks => matchingItem(sacks[0], sacks[1], sacks[2]))
        .map(item => itemPriority(item))
        .reduce((sum, value) => sum + value);

    return { part1, part2 };
}
