// Advent of Code 2018 Day xxa

module.exports = {
    both(input) {
        input = input[0];

        // Step 1: Parse input, generate list of valid rooms and doors

        // X,Y: [N, E, S, W, Distance]
        let stack = [[0, 0]];
        let rooms = { '0,0': [0, 0, 0, 0, Infinity] };
        let token, position;
        let bounds = { n: 0, e: 0, s: 0, w: 0 };

        let directions = {
            'N': { x: 0, y: -1, door: 0 },
            'E': { x: 1, y: 0, door: 1 },
            'S': { x: 0, y: 1, door: 2 },
            'W': { x: -1, y: 0, door: 3 }
        };
        let doors = [directions.N, directions.E, directions.S, directions.W];

        let pushRoom = (roomA, dir) => {
            let roomB = [roomA[0] + directions[dir].x, roomA[1] + directions[dir].y];

            let keyA = `${roomA[0]},${roomA[1]}`;
            let keyB = `${roomB[0]},${roomB[1]}`;

            if (!rooms[keyB]) rooms[keyB] = [0, 0, 0, 0, Infinity];

            if (keyA === '0,0' && directions[dir].door === 1) throw new Error('fock');
            rooms[keyA][directions[dir].door] = 1;
            rooms[keyB][(directions[dir].door + 2) % 4] = 1;

            return roomB;
        }

        for (let i = 0; i < input.length; i++) {
            token = input[i];
            position = stack[stack.length - 1];

            if (['N', 'E', 'S', 'W'].includes(token)) {
                position = pushRoom(position, token);
                stack[stack.length - 1] = position;
            } else if (token === '(') {
                stack.push(position.slice(0));
            } else if (token === '|') {
                stack.pop();
                stack.push(stack[stack.length - 1].slice(0));
            } else if (token === ')') {
                stack.pop();
            } else if (token === '^' || token === '$') {
                // noop
            } else {
                throw new Error('Unexpected character ' + token);
            }

            bounds.w = Math.min(bounds.w, position[0]);
            bounds.e = Math.max(bounds.e, position[0]);
            bounds.n = Math.min(bounds.n, position[1]);
            bounds.s = Math.max(bounds.s, position[1]);
        }

        // Step 2: Flood-fill rooms to find farthest room
        console.log(rooms);
        console.log(bounds);

        let queue = [[0, 0, 0]];

        while (queue.length > 0) {
            let pos = queue.shift();
            let room = rooms[`${pos[0]},${pos[1]}`];

            if (pos[2] < room[4]) {
                room[4] = pos[2];

                for (let i = 0; i < 4; i++) {
                    if (room[i]) {
                        queue.push([pos[0] + doors[i].x, pos[1] + doors[i].y, room[4] + 1]);
                    }
                }
            }
        }

        // Step 3: Select farthest room
        let farthestRoom = 0;
        Object.keys(rooms).forEach(roomKey => {
            farthestRoom = Math.max(rooms[roomKey][4], farthestRoom);
        });
        console.log("Farthest room: " + farthestRoom);

        // Step 4: How many rooms have a shortest path >= 1000 doors?
        let farCount = 0;
        Object.keys(rooms).forEach(roomKey => {
            if (rooms[roomKey][4] >= 1000) farCount++;
        });
        console.log(">= 1000 doors: " + farCount);
    }
};

let lines = require('fs').readFileSync('input.txt', 'utf8').split('\n');
if (lines[lines.length-1] === '') lines.pop();
module.exports.both(lines);
