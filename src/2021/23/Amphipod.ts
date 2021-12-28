// Year 2021 Day 23
// Amphipod

import { ISolution } from '../../util';

interface Position {
    x: number;
    y: number;
}

interface Amphipod extends Position {
    type: string;
}

interface State {
    rooms: Amphipod[][];
    hallway: Array<Amphipod|null>;
    cost: number;
}

const TYPES = ['A', 'B', 'C', 'D'];

const ENERGY_COST: Record<string, number> = {
    A: 1,
    B: 10,
    C: 100,
    D: 1000
};

// Helper functions

function stateKey(state: State) {
    return state.rooms.map(room => room.map(a => a.type).join(',')).join(';') + state.hallway.map(a => a?.type || '.').join('');
}

function getEnergyCost(a: Amphipod, to: Position): number {
    const manhattan: number = Math.abs(a.x - to.x) + Math.abs(a.y - to.y);
    return manhattan * ENERGY_COST[a.type];
}

function search(amphipods: Amphipod[]) {
    let stack: State[] = [
        {
            rooms: [ [], [], [], [] ],
            hallway: Array(12).fill(null),
            cost: 0
        }
    ];

    for (const a of amphipods) {
        stack[0].rooms[Math.floor(a.x/2)-1].push(a);
    }

    const roomSize: number = stack[0].rooms[0].length;
    const visited: Record<string, number> = {};
    let result: State | undefined;

    while (stack.length > 0) {
        // Both breadth-first and depth-first search work for this problem, but
        // depth-first is considerably faster (at least with this implementation,
        // it's 6 seconds vs 50 seconds).
        //
        // That's because diving as fast as we can to get ANY answer lets us start
        // skipping any path with an energy cost higher than that baseline answer,
        // pruning many more dead-ends than the breadth-first search.
        let state = stack.pop()!;
        let key = stateKey(state);

        // Shortcut 1: if we've found a solution with a lower energy cost than
        // the current state, skip.
        //
        // Note: often, this is where you'd want to insert additional heuristics...
        // for example, you could try to calculate the rough amount of energy "remaining"
        // from this state to a solution state. If only an A and a D are "missing",
        // then the actual estimated cost of this state is cost + 1001, for example.
        //
        // I tried some out but it seemed that calculating the heuristic was more
        // expensive than the time it saved, so I didn't include any here.
        if (result && state.cost >= result.cost) continue;

        // Shortcut 2: if we've ever seen this exact state before, but at a lower
        // energy cost, skip.
        if (visited[key] && visited[key] <= state.cost) continue;
        visited[key] = state.cost;

        let hasWrong: boolean[] = state.rooms.map((room, idx) => {
            return room.some(a => a.type !== TYPES[idx]);
        });

        let finished: boolean[] = state.rooms.map((room, idx) => {
            return room.every(a => a.type === TYPES[idx]) && room.length === roomSize;
        });

        // Shortcut 3: if this is a solution (all rooms are finished), skip.
        if (finished.every(item => item)) {
            if (!result || state.cost < result.cost) {
                result = state;
            }
            continue;
        }

        let moveOuts: State[] = [];
        let moveIns: State[] = [];

        for (let idx = 0; idx < state.rooms.length; idx++) {
            if (hasWrong[idx]) {
                for (let i = idx * 2 + 2; i >= 1; i--) {
                    if (state.hallway[i]) break;
                    if ([3, 5, 7, 9].includes(i)) continue;

                    let newState: State = {
                        rooms: state.rooms.map(room => room.slice()),
                        hallway: state.hallway.slice(),
                        cost: state.cost
                    };

                    let a = newState.rooms[idx].shift()!;
                    newState.hallway[i] = { type: a.type, x: i, y: 1 };
                    newState.cost += getEnergyCost(a, { x: i, y: 1 });
                    moveOuts.push(newState);
                }

                for (let i = idx * 2 + 4; i <= 11; i++) {
                    if (state.hallway[i]) break;
                    if ([3, 5, 7, 9].includes(i)) continue;

                    let newState: State = {
                        rooms: state.rooms.map(room => room.slice()),
                        hallway: state.hallway.slice(),
                        cost: state.cost
                    };

                    let a = newState.rooms[idx].shift()!;
                    newState.hallway[i] = { type: a.type, x: i, y: 1 };
                    newState.cost += getEnergyCost(a, { x: i, y: 1 });
                    moveOuts.push(newState);
                }
            }

            if (!hasWrong[idx] && !finished[idx]) {
                for (let i = 1; i <= 11; i++) {
                    if (state.hallway[i]?.type === TYPES[idx]) {
                        let canReach: boolean = true;
                        for (let x = Math.min(i, idx * 2 + 3); x <= Math.max(i, idx * 2 + 3); x++) {
                            if (state.hallway[x] && x !== i) canReach = false;
                        }

                        if (canReach) {
                            let newState: State = {
                                rooms: state.rooms.map(room => room.slice()),
                                hallway: state.hallway.slice(),
                                cost: state.cost
                            };

                            let a = newState.hallway[i]!;
                            let b = { type: a.type, x: idx * 2 + 3, y: roomSize + 1 };
                            if (newState.rooms[idx][0]) b.y = newState.rooms[idx][0].y - 1;
                            newState.hallway[i] = null;
                            newState.rooms[idx].unshift(b);
                            newState.cost += getEnergyCost(a, b);
                            moveIns.push(newState);
                        }
                    }
                }
            }
        }

        // Since our search is a blind depth-first search, we can "prioritize" moves that
        // get closer to a finished room by adding them to the stack last.
        stack.push(...moveOuts, ...moveIns);
    }

    return result!.cost;
}

function parseInput(input: string[]): Amphipod[] {
    const amphipods: Amphipod[] = [];

    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x].match(/[ABCD]/)) {
                amphipods.push({ x, y, type: input[y][x] });
            }
        }
    }

    return amphipods;
}

export function solve(input: string[]): ISolution<number> {
    // Part 1
    const part1: number = search(parseInput(input));

    // Part 2
    const part2: number = search(parseInput([
        ...input.slice(0, 3),
        '  #D#C#B#A#  ',
        '  #D#B#A#C#  ',
        ...input.slice(3)
    ]));

    return { part1, part2 };
}
