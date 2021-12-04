// Year 2021 Day 04
// Giant Squid

import { ISolution } from '../../util';

type Square = {
    value: number;
    marked: boolean;
};

type Board = Square[][];

function markSquares(number: number, boards: Board[]) {
    for (let board of boards) {
        for (let row of board) {
            for (let square of row) {
                if (square.value === number) square.marked = true;
            }
        }
    }
}

function isWinning(board: Board): boolean {
    for (let i = 0; i < board.length; i++) {
        let winRow = true, winColumn = true;
        for (let j = 0; j < board.length; j++) {
            if (!board[i][j].marked) winRow = false;
            if (!board[j][i].marked) winColumn = false;
        }
        if (winRow || winColumn) return true;
    }
    return false;
}

function unmarkedScore(board: Board): number {
    let sum = 0;

    for (let row of board)  {
        for (let entry of row) {
            if (!entry.marked) sum += entry.value;
        }
    }

    return sum;
}

function simulateWinners(numbers: number[], boards: Board[]): number[] {
    boards = boards.map(board => board.map(row => row.map(square => ({ ...square }))));
    const results: number[] = [];

    for (let number of numbers) {
        markSquares(number, boards);

        for (let winner of boards.filter(board => isWinning(board))) {
            results.push(unmarkedScore(winner) * number);
            boards.splice(boards.indexOf(winner), 1);
        }
    }

    return results;
}

export function solve(input: string[]): ISolution<number> {
    const sections: string[] = input.join('\n').split('\n\n');
    const numbers: number[] = sections.shift()!.split(',').map(Number);
    const boards: Board[] = sections.map(section => section.split('\n').map(row => row.trim().split(/ +/).map(square => ({ value: Number(square), marked: false }))));

    const results = simulateWinners(numbers, boards);

    // Part 1
    const part1 = results[0];

    // Part 2
    const part2 = results[results.length - 1];

    return { part1, part2 };
}
