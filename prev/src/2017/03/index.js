// ------------------------------------------------------------------------
// Year 2017 Day 03
// ------------------------------------------------------------------------
const { log, fill2d } = require('../../util');

function position(square) {
  let grid = 1;
  while (square > grid * grid) grid += 2;

  let x = grid - 1, y = grid - 1, value = grid * grid;

  while (value != square) {
    value--;

    if (y === grid - 1 && x > 0) {
      x--;
    } else if (x === 0 && y > 0) {
      y--;
    } else if (y === 0 && x < grid - 1) {
      x++;
    } else {
      y++;
    }
  }

  return [x, y, grid];
}

function distance(square) {
  let [x, y, grid] = position(square);
  let center = (grid - 1) / 2;
  return Math.abs(x - center) + Math.abs(y - center);
}

function firstValueLarger(input) {
  let [grid] = position(input).slice(2);
  let x = (grid - 1) / 2 + 1, y = (grid - 1) / 2 + 1;
  let matrix = fill2d(grid + 2, grid + 2, 0);
  matrix[y][x] = 1;

  let queue = [];
  let size = 1;

  for(;;) {
    if (queue.length === 0) {
      size += 2;
      queue.push([1, 0]);
      for (let i = 0; i < size - 2; i++) queue.push([0, -1]);
      for (let i = 0; i < size - 1; i++) queue.push([-1, 0]);
      for (let i = 0; i < size - 1; i++) queue.push([0, 1]);
      for (let i = 0; i < size - 1; i++) queue.push([1, 0]);
    }
    let [dx,dy] = queue.shift();
    x += dx; y += dy;

    let value = matrix[y - 1][x] + matrix[y + 1][x] + matrix[y][x + 1] + matrix[y][x - 1] +
      matrix[y - 1][x - 1] + matrix[y + 1][x + 1] + matrix[y - 1][x + 1] + matrix[y + 1][x - 1];
    matrix[y][x] = value;
    if (value > input) return value;
  }
}

module.exports = function solve(lines) {
  //// Part 1 ////
  let input = parseInt(lines[0], 10);
  let result1 = distance(input);
  log.part1(result1);

  //// Part 2 ////
  let result2 = firstValueLarger(input);
  log.part2(result2);
};
