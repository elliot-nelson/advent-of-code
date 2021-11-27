// ------------------------------------------------------------------------
// Year 2019 Day 20
//
// Part 1 and Part 2 down. My Part 2 is a breadth-first search that has no
// heuristics at all, so i takes a good 60 seconds to run... I could get
// that lower with a little sorting I think, but for now I'll commit it.
// ------------------------------------------------------------------------
import { p, part1, part2 } from '../../util';

const DIR = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0]
];

const PORTALDIR = [
  [[0, -2], [0, -1]],
  [[1, 0], [2, 0]],
  [[0, 1], [0, 2]],
  [[-2, 0], [-1, 0]]
];

function isChar(c) {
  return c >= 'A' && c <= 'Z';
}

function isPortal(str) {
  return str.match(/^[A-Z]{2}$/);
}

function outerJump(maze, x, y) {
  let width = Math.max(...maze.map(row => row.length));
  return (x <= 3 || y <= 3 || x >= width - 4 || y > maze.length - 4);
}

function parseMaze(input: string[]) {
  let maze = input.map(line => line.split(''));
  let portals = {};
  let jumps = {};

  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      if (maze[y][x] === '.') {
        for (let i = 0; i < DIR.length; i++) {
          let d = PORTALDIR[i];
          let portal = maze[y+d[0][1]][x+d[0][0]] + maze[y+d[1][1]][x+d[1][0]];
          if (isPortal(portal)) {
            portals[portal] = portals[portal] || [];
            //portals[portal].push([x, y]);
            portals[portal].push([x, y]);
          }
        }
      }
    }
  }

  for (let key of Object.keys(portals)) {
    let portal = portals[key];

    jumps[String(portal[0])] = { label: key, xy: portal[1] };
    jumps[String(portal[1])] = { label: key, xy: portal[0] };
  }

  return { maze, portals, jumps };
}

function traverseMaze({ maze, portals, jumps }, recursive = false) {
  let entrance = portals.AA[0];
  let exit = portals.ZZ[0];
  let queue = [];
  let visited = {};
  let zMultiplier = recursive ? 1 : 0;

  queue.push([...entrance, 0, 0, []]);

  while (queue.length > 0) {
    let [x, y, z, cost, path] = queue.shift();
    let key = `${x},${y},${z}`;
    let jumpKey = `${x},${y}`;

    if (x === exit[0] && y === exit[1] && z === 0) {
      // Uncomment to print the entire path to the exit
      // p(path.join('\n'));
      return cost;
    }

    if (visited[key] <= cost) continue;
    visited[key] = cost;

    // Uncomment to print a whole bunch of debugging info
    // p('xyc=', x,y,z,cost, 'q=', queue.length, 'v=', Object.keys(visited).length);

    for (let d of DIR) {
      if (maze[y+d[1]][x+d[0]] === '.') {
        queue.push([x+d[0], y+d[1], z, cost + 1, path.concat(`move ${d[0]},${d[1]}`)]);
      }
    }
    if (jumps[jumpKey] && jumps[jumpKey].xy) {
      let outer = outerJump(maze, x, y);
      let label = jumps[jumpKey].label;
      if (outer) {
        if (z > 0) {
          queue.push([jumps[jumpKey].xy[0], jumps[jumpKey].xy[1], z - zMultiplier, cost + 1, path.concat(`jump out ${label}`)]);
        }
      } else {
        queue.push([jumps[jumpKey].xy[0], jumps[jumpKey].xy[1], z + zMultiplier, cost + 1, path.concat(`jump in ${label}`)]);
      }
    }
  }
}

export function solve(input: string[]): void {
  //// Part 1 ////
  let state = parseMaze(input);
  let result1 = traverseMaze(state);
  part1(result1);

  //// Part 2 ////
  state = parseMaze(input);
  let result2 = traverseMaze(state, true);
  part2(result2);
};
