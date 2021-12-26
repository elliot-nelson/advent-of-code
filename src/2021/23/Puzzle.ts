// Year 2021 Day xx
// xx

import { ISolution } from '../../util';

interface Position {
    x: number;
    y: number;
}

interface Amphipod extends Position {
    type: string;
}

interface State {
    amphipods: Amphipod[];
    lastMove: number;
    cost: number;
    turns: number;
}

const ENERGY_COST: Record<string, number> = {
    A: 1,
    B: 10,
    C: 100,
    D: 1000
};

const DESTINATION_ROOM: Record<string, number> = {
    A: 3,
    B: 5,
    C: 7,
    D: 9
};

// Helper functions

function stateKey(state: State) {
    return state.amphipods.map(a => `${a.type}${a.x},${a.y}`).join(';') + ':' + state.lastMove;
}

/*function canMoveTo(a: Amphipod, to: Position, map: string[][]): boolean {
    const destinationRooms = {
        A: 3,
        B: 5,
        C: 7,
        D: 9
    };

    // You can't move into a wall
    if (map[to.y][to.x] !== '.') return false;

    if (a.y === 1 && to.y > 1) {
        return to.x === destinationRooms[a.type];
    }
}

function validMove
function validMoveFor(
function roomFor
function emptySpace(x, y) {
}

function room

function search(start: */

function getEnergyCost(a: Amphipod, to: Position): number {
    const manhattan: number = Math.abs(a.x - to.x) + Math.abs(a.y - to.y);
    return manhattan * ENERGY_COST[a.type];
}

function getSteps(a: Amphipod, to: Position): number {
    return Math.abs(a.x - to.x) + Math.abs(a.y - to.y);
}

function getMinimumDiff(state: State): number {
    let a = state.amphipods.filter(a => a.type === 'A');
    let b = state.amphipods.filter(a => a.type === 'B');
    let c = state.amphipods.filter(a => a.type === 'C');
    let d = state.amphipods.filter(a => a.type === 'D');

    return Math.min(
        getEnergyCost(a[0], { x: 3, y: 2 }) + getEnergyCost(a[1], { x: 3, y: 3 }),
        getEnergyCost(a[1], { x: 3, y: 2 }) + getEnergyCost(a[0], { x: 3, y: 3 })
    ) + Math.min(
        getEnergyCost(b[0], { x: 5, y: 2 }) + getEnergyCost(b[1], { x: 5, y: 3 }),
        getEnergyCost(b[1], { x: 5, y: 2 }) + getEnergyCost(b[0], { x: 5, y: 3 })
    ) + Math.min(
        getEnergyCost(c[0], { x: 7, y: 2 }) + getEnergyCost(c[1], { x: 7, y: 3 }),
        getEnergyCost(c[1], { x: 7, y: 2 }) + getEnergyCost(c[0], { x: 7, y: 3 })
    ) + Math.min(
        getEnergyCost(c[0], { x: 9, y: 2 }) + getEnergyCost(d[1], { x: 9, y: 3 }),
        getEnergyCost(c[1], { x: 9, y: 2 }) + getEnergyCost(d[0], { x: 9, y: 3 })
    );
}

function isOutsideRoom(pos: Position) {
    return pos.y === 1 && (pos.x === 3 || pos.x === 5 || pos.x == 7 || pos.x === 9);
}

function isInsideRoom(pos: Position) {
    return (pos.y === 2 || pos.y === 3) && (pos.x === 3 || pos.x === 5 || pos.x == 7 || pos.x === 9);
}

function isMoveValid(a: Amphipod, to: Position, map: string[][], amphipods: Amphipod[]): boolean {
    const destinationRooms = {
        A: 3,
        B: 5,
        C: 7,
        D: 9
    };

    // You can't move into a wall
    if (map[to.y][to.x] !== '.') return false;

    // You can't move into another amphipod
    if (amphipods.find(a2 => a2.x === to.x && a2.y === to.y)) return false;

    // You can't move into a room that isn't yours
    if (a.y === 1 && to.y > 1 && to.x !== destinationRooms[a.type]) return false;

    // You can't move into your OWN room, if there's a squatter
    if (a.y === 1 && to.y > 1) {
        if (amphipods.find(a2 => a2.x === to.x && a2.y > 1 && destinationRooms[a2.type] !== a2.x)) return false;
    }

    // All clear!
    return true;
}

function isSolved(state: State): boolean {
    for (let a of state.amphipods) {
        if (a.y === 1 || DESTINATION_ROOM[a.type] !== a.x) return false;
    }
    return true;
}

function search(amphipods: Amphipod[], map: string[][]) {
    let stack: State[] = [];
    let visited: Record<string, number> = {};

    stack.push({ amphipods: amphipods.map(a => ({ ...a })), lastMove: -1, cost: 0, turns: 0 });

    const pushNewState = (state: State, idx: number, to: Position) => {
        const a: Amphipod = state.amphipods[idx];

        // Before pushing a new state, confirm this move is a valid move, according
        // to all of the rules described for movement.
        //if (!isMoveValid(a, to, map, state.amphipods)) return;

        const newState: State = {
            amphipods: [
                ...state.amphipods.slice(0, idx),
                { type: a.type, x: to.x, y: to.y },
                ...state.amphipods.slice(idx + 1),
            ],
            lastMove: idx,
            cost: state.cost + getEnergyCost(a, to),
            turns: state.turns + getSteps(a, to)
        };

        if (newState.amphipods.length !== 8) throw new Error();
        stack.push(newState);
    };

    let results: State[] = [];

    let bestAnswer: number = 190000;

    let br: number = 29999000;
    let skipped: number = 0;
    while (stack.length > 0) {
        br--;
        if (br < 0) break;

        let state: State = stack.pop()!;
        //let key = stateKey(state);

        //console.log(state);
        if (br % 10000 === 0)
            console.log('br-', br, 'skipped', skipped, 'stacklength', stack.length);

        //if (visited[key] && visited[key] < state.cost) continue;
        //visited[key] = state.cost;

        if (isSolved(state)) {
            if (state.cost < bestAnswer) {
                console.log('DID IT !');
                results = [state];
                bestAnswer = state.cost;
            }
            continue;
        }

        let minDiff = getMinimumDiff(state);

        if (state.cost + minDiff > bestAnswer) {
            skipped++;
            continue;
        }

        let moveOut: number[] = [];
        let moveIn: number[] = [];

        for (let i = 0; i < state.amphipods.length; i++) {
            let a = state.amphipods[i];
            let b = state.amphipods.find(b => b.y === a.y + 1 && b.x === a.x);

            // If the amphipod is safe in the right room, don't move it!
            if (a.y === 3 && DESTINATION_ROOM[a.type] === a.x) continue;

            // If the amphipod is in the wrong room, OR is in the right room
            // but is ABOVE an amphipod in the wrong room, it has to get out.
            if ((a.y > 1 && DESTINATION_ROOM[a.type] !== a.x) ||
                (b && DESTINATION_ROOM[b.type] !== b.x)) {
                // Note that blocked amphipods can't get out.
                let c = state.amphipods.find(c => c.y === a.y - 1 && c.x === a.x);
                if (!c) moveOut.push(i);
            }

            // Amphipods in the hallway have to get back in
            if (a.y === 1) moveIn.push(i);
        }

        //console.log(draw(state, map));
        //console.log('->', 'move in', moveIn.length, 'move out', moveOut.length);

        for (let i of moveOut) {
            let a = state.amphipods[i];
            let possibleX: number[] = [];

            for (let x = a.x - 1; x >= 1; x--) {
                if (Object.values(DESTINATION_ROOM).includes(x)) continue;
                if (state.amphipods.find(b => b.y === 1 && b.x === x)) break;
                possibleX.push(x);
            }

            for (let x = a.x + 1; x <= 11; x++) {
                if (Object.values(DESTINATION_ROOM).includes(x)) continue;
                if (state.amphipods.find(b => b.y === 1 && b.x === x)) break;
                possibleX.push(x);
            }

            //console.log(possibleX);

            for (let x of possibleX) {
                pushNewState(state, i, { x: x, y: 1 });
            }
        }

        // Moving things IN is the top priority
        for (let i of moveIn) {
            let a = state.amphipods[i];
            let r = DESTINATION_ROOM[a.type];

            let pathAccessible = true;
            for (let x = Math.min(a.x, r); x <= Math.max(a.x, r); x++) {
                let f = state.amphipods.find((f, idx) => f.y === 1 && f.x === x && idx !== i);
                if (f) {
                    pathAccessible = false;
                    break;
                }
            }

            if (pathAccessible) {
                let b = state.amphipods.find(b => b.y === 2 && b.x === r);
                let c = state.amphipods.find(c => c.y === 3 && c.x === r);

                if (!b && !c) {
                    pushNewState(state, i, { x: r, y: 3 });
                } else if (!b && c && DESTINATION_ROOM[c.type] === c.x) {
                    pushNewState(state, i, { x: r, y: 2 });
                }
            }
        }

        /*
        // If the most recent move was by an amphipod that landed outside a room,
        // we must continue to move that amphipod.
        if (state.lastMove >= 0 && isOutsideRoom(state.amphipods[state.lastMove])) {
            let a = state.amphipods[state.lastMove];
            pushNewState(state, state.lastMove, { x: a.x - 1, y: a.y });
            pushNewState(state, state.lastMove, { x: a.x + 1, y: a.y });
            pushNewState(state, state.lastMove, { x: a.x, y: a.y - 1 });
            pushNewState(state, state.lastMove, { x: a.x, y: a.y + 1 });
            continue;
        }

        // If not, we are free to move any amphipod, EXCEPT those already in the
        // hallway that did not take the most recent move.
        for (let i = 0; i < state.amphipods.length; i++) {
            let a = state.amphipods[i];
            if (a.y > 1 || a.y === 1 && i === state.lastMove) {
                pushNewState(state, i, { x: a.x - 1, y: a.y });
                pushNewState(state, i, { x: a.x + 1, y: a.y });
                pushNewState(state, i, { x: a.x, y: a.y - 1 });
                pushNewState(state, i, { x: a.x, y: a.y + 1 });
            }
        }
        */

        // All possible moves from this state have been added to the stack!
    }

    console.log('reach this point bad');

    //console.log(visited);

    if (stack.length > 0) {
        console.log(draw(stack[0], map));
        console.log(stack[0]);
        console.log(draw(stack[stack.length-1], map));
        console.log(stack[stack.length-1]);

        //console.log(draw(stack[stack.length - 1], map));
        console.log(stack[stack.length - 1]);
    }

    console.log('FIN');

    //console.log(results);
    console.log(results.length);
    console.log(results.map(r => r.cost).sort((a,b)=>a-b));
}

function draw(state: State, map: string[][]) {
    return map.map((row, y) => {
        return row.map((c, x) => {
            let a = state.amphipods.find(a => a.x === x && a.y === y);
            return a ? a.type : c;
        }).join('');
    }).join('\n');
}

export function solve(input: string[]): ISolution<number> {
    const start: Amphipod[] = [];
    const map: string[][] = [];

    for (let y = 0; y < input.length; y++) {
        map[y] = [];
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x].match(/[ABCD]/)) {
                start.push({ x, y, type: input[y][x] });
                map[y].push('.');
            } else {
                map[y].push(input[y][x]);
            }
        }
    }

    search(start, map);

    // Part 1
    //console.log('part1');
    const part1 = 0;

    // Part 2
    //console.log('part2');
    const part2 = 0;

    return { part1, part2 };
}
