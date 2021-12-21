// Year 2021 Day 21
// Dirac Dice

import { ISolution } from '../../util';

// Our "game state" represents everything unique about this game state,
// plus the known potential number of universes that currently are in
// that state.
//
// (This state is only needed when playing Dirac Dice.)
type GameState = {
    positions: number[];
    scores: number[];
    turn: number;
    universes: number;
}

function simulateDeterministicDice(players: number[]) {
    let positions: number[] = [...players];
    let scores: number[] = [0, 0];
    let die: number = 0;
    let numberRolls: number = 0;

    for (;;) {
        for (let idx = 0; idx < players.length; idx++) {
            let move = (die = (die % 100) + 1);
            move += (die = (die % 100) + 1);
            move += (die = (die % 100) + 1);
            numberRolls += 3;

            positions[idx] = (positions[idx] + move - 1) % 10 + 1;
            scores[idx] += positions[idx];

            if (scores[idx] >= 1000) {
                return numberRolls * scores[1 - idx];
            }
        }
    }
}

function stepDiracDice(states: GameState[]): GameState[] {
    // Every "turn" taken by a player results in 3 dice rolls in a row,
    // multiplying the number of universes by 27. This is a little
    // precomputed table of the possible dice sums and the number of universes
    // each would appear in.
    const dice: number[][] = [
        [3, 1],
        [4, 3],
        [5, 6],
        [6, 7],
        [7, 6],
        [8, 3],
        [9, 1]
    ];

    const results: GameState[] = [];
    const hash: Record<string, number> = {};

    for (let state of states) {
        for (let [move, universes] of dice) {
            const newState: GameState = {
                positions: [...state.positions],
                scores: [...state.scores],
                turn: state.turn,
                universes: state.universes
            };

            newState.positions[newState.turn] = (newState.positions[newState.turn] + move - 1) % 10 + 1;
            newState.scores[newState.turn] += newState.positions[newState.turn];
            newState.turn = 1 - newState.turn;
            newState.universes *= universes;

            const key = `${newState.positions},${newState.scores},${newState.turn}`;

            // Taking different paths can result in an identical game state, but if it does,
            // we don't need to keep them separate anymore; we can "merge" them into a new
            // total number of universes with that identical game state.
            if (hash[key]) {
                results[hash[key]].universes += newState.universes;
            } else {
                hash[key] = results.length;
                results.push(newState);
            }
        }
    }

    return results;
}

function simulateDiracDice(players): number {
    let states: GameState[] = [
        { positions: [...players], scores: [0, 0], turn: 0, universes: 1 }
    ];

    const winning: number[] = [0, 0];

    while (states.length > 0) {
        states = stepDiracDice(states);

        states = states.filter(state => {
            if (state.scores[0] >= 21) {
                winning[0] += state.universes;
                return false;
            }
            if (state.scores[1] >= 21) {
                winning[1] += state.universes;
                return false;
            }
            return true;
        });
    }

    return Math.max(...winning);
}

export function solve(input: string[]): ISolution<number> {
    const players: number[] = input.map(line => Number(line.match(/\d+$/)![0]));

    // Part 1
    const part1: number = simulateDeterministicDice(players);

    // Part 2
    const part2: number = simulateDiracDice(players);

    return { part1, part2 };
}
