// Year 2021 Day 12
// Passage Pathing

import { ISolution } from '../../util';

function canVisit(allowOneRevisit: boolean, path: string[], cave: string): boolean {
    // You can always visit a large cave.
    if (cave.toUpperCase() === cave) return true;

    // You can always visit a cave you haven't visited.
    if (!path.includes(cave)) return true;

    // Stop here for Part 1 (no revisits allowed for small caves).
    if (!allowOneRevisit) return false;

    // Check for any revisited small caves.
    for (let i = 0; i < path.length; i++) {
        if (path[i].toUpperCase() === path[i]) continue;
        if (path.find((elem, index) => index > i && elem === path[i])) return false;
    }

    return true;
}

function countUniquePaths(connections: string[][], visitFilter: (path: string[], cave: string) => boolean) {
    const stack: string[][] = [['start']];
    const results: string[][] = [];

    while (stack.length > 0) {
        const state: string[] = stack.pop()!;

        if (state[0] === 'end') {
            results.push(state);
            continue;
        }

        for (let connection of connections) {
            if (connection[0] === state[0] && visitFilter(state, connection[1])) {
                stack.push([connection[1], ...state]);
            }
        }
    }

    return results.length;
}

export function solve(input: string[]): ISolution<number> {
    // Before beginning, turn the list of connections into a list of FROM->TO connections,
    // and weed out the disallowed connections like END->* and *->START.
    let connections: string[][] = input.map(line => line.split('-'));
    connections = [...connections, ...connections.map(pair => [...pair].reverse())];
    connections = connections.filter(pair => pair[0] !== 'end' && pair[1] !== 'start');

    // Part 1
    const part1: number = countUniquePaths(connections, canVisit.bind(undefined, false));

    // Part 2
    const part2: number = countUniquePaths(connections, canVisit.bind(undefined, true));

    return { part1, part2 };
}
