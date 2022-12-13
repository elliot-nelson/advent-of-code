// Year 2022 Day 13
// Distress Signal

import { ISolution } from '../../util';

type Packet = Array<number | Packet>;

function comparePackets(left: Packet, right: Packet): number {
    const len = Math.max(left.length, right.length);

    for (let i = 0; i < len; i++) {
        if (typeof left[i] === 'undefined') return -1;
        if (typeof right[i] === 'undefined') return 1;

        if (Array.isArray(left[i]) || Array.isArray(right[i])) {
            const l: Packet = Array.isArray(left[i]) ? left[i] as Packet : [left[i]];
            const r: Packet = Array.isArray(right[i]) ? right[i] as Packet : [right[i]];
            const result: number = comparePackets(l, r);
            if (result !== 0) return result;
            continue;
        }

        if (left[i] < right[i]) return -1;
        if (left[i] > right[i]) return 1;
        continue;
    }

    return 0;
}

export function solve(input: string[]): ISolution<number> {
    const pairs: Packet[][]  = input.join('\n').split('\n\n').map(pair => pair.split('\n').map(x => JSON.parse(x)));

    // Part 1
    const part1 = pairs.reduce((sum, pair, index) => {
        if (comparePackets(pair[0], pair[1]) < 0) {
            sum += (index + 1);
        }
        return sum;
    }, 0);

    // Part 2
    const packets: Packet[] = pairs.flat();
    packets.push([[2]]);
    packets.push([[6]]);
    packets.sort((a, b) => comparePackets(a, b));

    const part2 = packets.reduce((product, packet, index) => {
        if (JSON.stringify(packet) === '[[2]]') product *= (index + 1);
        if (JSON.stringify(packet) === '[[6]]') product *= (index + 1);
        return product;
    }, 1);

    return { part1, part2 };
}
