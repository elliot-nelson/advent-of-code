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

interface State {
  grid: string[][];
  minY: number;
  maxY: number;
}

interface Result {
  touchedWater: number;
  standingWater: number;
}

function buildState(input: string[]): State {
  let grid = [];
  let minY = Infinity, maxY = 0;

  for (let line of input) {
    let object = {} as any;
    line.split(', ').forEach(wall => {
      let [key, value] = wall.split('=');
      if (value.indexOf('.') >= 0) {
        object[key] = value.split('..').map(x => parseInt(x, 10));
      } else {
        object[key] = [parseInt(value, 10), parseInt(value, 10)];
      }
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

function simulate({ grid, minY, maxY }): Result {
  let queue = [{ x: 500, y: 0 }];
  let touchedWater = new Set();
  let standingWater = new Set();
  let add = (x: number, y: number, standing: boolean) => {
    if (y >= minY && y <= maxY) {
      touchedWater.add(x + ',' + y);
      if (standing) standingWater.add(x + ',' + y);
    }
  }

  add(500, 0, false);

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
      add(square.x, square.y, false);
      queue.unshift({ x: square.x, y: square.y + 1 });
    } else if (grid[square.y + 1][square.x] === '|') {
      // We've run into an existing water stream, ignore it
      grid[square.y][square.x] = '|';
      add(square.x, square.y, false);
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
          add(i, square.y, true);
        }
        queue.unshift({ x: square.x, y: square.y - 1 });
      } else {
        // At least one side is open, so we need to follow the stream(s)
        for (let i = leftX; i <= rightX; i++) {
          grid[square.y][i] = '|';
          add(i, square.y, false);
        }
        if (leftOpen) queue.unshift({ x: leftX, y: square.y + 1 });
        if (rightOpen) queue.unshift({ x: rightX, y: square.y + 1 });
      }
    }
  }

  return {
    touchedWater: touchedWater.size,
    standingWater: standingWater.size
  };
}

export function solve(input: string[]) {
  //// Part 1 ////
  const state = buildState(input);
  const result = simulate(state);
  let result1 = result.touchedWater;
  log.part1(result1);

  //// Part 2 ////
  let result2 = result.standingWater;
  log.part2(result2);
};
