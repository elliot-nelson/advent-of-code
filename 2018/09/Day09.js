class Day09 {
    constructor(input) {
        this.input = input;
    }

    insert(pointer, value) {
        let newMarble = { cw: null, ccw: null, value: value };

        if (!pointer) {
            newMarble.cw = newMarble;
            newMarble.ccw = newMarble;
            return newMarble;
        }

        pointer = pointer.cw;
        let cw = pointer.cw;
        let ccw = pointer;

        newMarble.cw = cw;
        newMarble.ccw = ccw;
        cw.ccw = newMarble;
        ccw.cw = newMarble;

        return newMarble;
    }

    remove(pointer) {
        let cw = pointer.cw;
        let ccw = pointer.ccw;
        cw.ccw = pointer.ccw;
        ccw.cw = pointer.cw;
        return cw;
    }

    status(pointer, players, playerIdx) {
        let original = pointer;
        let string = '[' + playerIdx + '] ';
        for (;;) {
            string += pointer.value + ' ';
            pointer = pointer.cw;
            if (pointer === original) break;
        }
        console.log(string);
    }

    run() {
        let match = this.input[0].match(/(\d+) players;.* worth (\d+)/);
        let playerCount = parseInt(match[1], 10);
        let lastMarbleValue = parseInt(match[2], 10);

        let players = [];
        let playerIdx = 0;

        // Part 1

        for (let i = 0; i < playerCount; i++) players[i] = 0;

        let pointer = this.insert(null, 0);

        for (let marble = 1; marble <= lastMarbleValue; marble++) {
            if (marble % 23 === 0) {
                players[playerIdx] = (players[playerIdx] || 0) + marble;

                for (let i = 0; i < 7; i++) {
                    pointer = pointer.ccw;
                }
                players[playerIdx] += pointer.value;
                pointer = this.remove(pointer);
            } else {
                pointer = this.insert(pointer, marble);
            }

            playerIdx = (playerIdx + 1) % playerCount;
        }

        console.log(players);
        console.log('Winning total: ' + players.sort()[players.length - 1]);

        // Part 2

        for (let i = 0; i < playerCount; i++) players[i] = 0;

        pointer = this.insert(null, 0);
        lastMarbleValue *= 100;

        for (let marble = 1; marble <= lastMarbleValue; marble++) {
            if (marble % 23 === 0) {
                players[playerIdx] = (players[playerIdx] || 0) + marble;

                for (let i = 0; i < 7; i++) {
                    pointer = pointer.ccw;
                }
                players[playerIdx] += pointer.value;
                pointer = this.remove(pointer);
            } else {
                pointer = this.insert(pointer, marble);
            }

            playerIdx = (playerIdx + 1) % playerCount;
        }

        console.log(players);
        console.log('Winning total: ' + players.sort()[players.length - 1]);
    }
}
module.exports = Day09;
