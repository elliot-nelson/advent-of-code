// ------------------------------------------------------------------------
// Year 2018 Day 17
//
// Part 1: Treated it as a classic queue and wrote it out methodically,
// the caveat is that as my default (breadth-first) it runs a long time
// and ran out of memory! (There end up being MANY individual streams of
// vertical water.)
//
// Flipping to depth-first makes it finish almost immediately. Interesting
// (maybe intentional) reversal there.
//
// Part 2: I didn't take any shortcuts in Part 1, so Part 2 took all of 60
// seconds to slap together.
// ------------------------------------------------------------------------
import { log } from '../../util';

function buildGrid(input) {
  let grid = [];
  let minY = Infinity, maxY = 0;

  for (let line of input) {
    let object = {} as any;
    line.split(', ').forEach(wall => {
      let [key, value] = wall.split('=');
      if (value.indexOf('.') >= 0) {
        value = value.split('..').map(x => parseInt(x, 10));
      } else {
        value = [parseInt(value, 10), parseInt(value, 10)];
      }
      object[key] = value;
    });

    for (let y = object.y[0]; y <= object.y[1]; y++) {
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      for (let x = object.x[0]; x <= object.x[1]; x++) {
        grid[y] = grid[y] || [];
        grid[y][x] = '#';
      }
    }
  }

  return { grid, minY, maxY };
}

function fill({ grid, minY, maxY }) {
  let queue = [{ x: 500, y: 0 }];
  let water = {};
  let add = (x, y) => {
    if (y >= minY && y <= maxY) water[x + ',' + y] = true;
  }

  add(500, 0);

  while (queue.length > 0) {
    let square = queue.shift();
    if (square.y > maxY) continue;

    if (grid[square.y] === undefined) {
      grid[square.y] = [];
    }
    if (grid[square.y + 1] === undefined) {
      grid[square.y + 1] = [];
    }

    if (grid[square.y + 1][square.x] === undefined) {
      // Untraversed territory, so mark off and follow vertically
      grid[square.y][square.x] = '|';
      add(square.x, square.y);
      queue.unshift({ x: square.x, y: square.y + 1 });
    } else if (grid[square.y + 1][square.x] === '|') {
      // We've run into an existing water stream, ignore it
      grid[square.y][square.x] = '|';
      add(square.x, square.y);
      continue;
    } else if (grid[square.y + 1][square.x] === '#' || grid[square.y + 1][square.x] === '~') {
      // Wall or filled water line, let's investigate!
      let leftX = square.x, rightX = square.x, leftOpen = true, rightOpen = true;
      for (;;) {
        if (grid[square.y][leftX - 1] === '#') {
          leftOpen = false;
          break;
        } else {
          leftX--;
          if (grid[square.y + 1][leftX] !== '#' && grid[square.y + 1][leftX] !== '~') break;
        }
      }
      for (;;) {
        if (grid[square.y][rightX + 1] === '#') {
          rightOpen = false;
          break;
        } else {
          rightX++;
          if (grid[square.y + 1][rightX] !== '#' && grid[square.y + 1][rightX] !== '~') break;
        }
      }
      if (!leftOpen && !rightOpen) {
        // It's walled off!
        for (let i = leftX; i <= rightX; i++) {
          grid[square.y][i] = '~';
          add(i, square.y);
        }
        queue.unshift({ x: square.x, y: square.y - 1 });
      } else {
        // At least one side is open, so we need to follow the stream(s)
        for (let i = leftX; i <= rightX; i++) {
          grid[square.y][i] = '|';
          add(i, square.y);
        }
        if (leftOpen) queue.unshift({ x: leftX, y: square.y + 1 });
        if (rightOpen) queue.unshift({ x: rightX, y: square.y + 1 });
      }
    }
  }

  return Object.keys(water).length;
}

function countStandingWater({ grid, minY, maxY }) {
  let water = 0;

  for (let y = minY; y <= maxY; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === '~') water++;
    }
  }

  return water;
}

export function solve(input: string[]) {
  //// Part 1 ////
  const state = buildGrid(input);
  let result1 = fill(state);
  log.part1(result1);

  //// Part 2 ////
  let result2 = countStandingWater(state);
  log.part2(result2);
};
