// ------------------------------------------------------------------------
// Year 2019 Day 10
// ------------------------------------------------------------------------
import { p, part1, part2 } from '../../util';

function parseInput(input: string[]) {
  return input.map(line => line.split(''));
}

function unitVector(x1, y1, x2, y2) {
  let m = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  return [(x2 - x1) / m, (y2 - y1) / m, m];
}

function angleFromVector(x, y): number {
  return Math.atan2(y, x);
}

function asteroidsVisible(map, x, y) {
  let vectors = {};

  for (let v = 0; v < map.length; v++) {
    for (let u = 0; u < map[v].length; u++) {
      if (map[v][u] === '#' && !(x === u && y === v)) {
        let vector = unitVector(x, y, u, v);
        let keyx = Math.floor(vector[0] * 100000) / 100000, keyy = Math.floor(vector[1] * 100000) / 100000;
        let key = `${keyx},${keyy}`;
        vectors[key] = vectors[key] || [];
        vectors[key].push([u, v, vector[2], angleFromVector(keyx, keyy)]);
      }
    }
  }

  return vectors;
}

function bestAsteroid(map) {
  let possible = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '#') {
        let count = Object.keys(asteroidsVisible(map, x, y)).length;
        possible.push([x, y, count]);
      }
    }
  }

  possible.sort((a, b) => b[2] - a[2]);
  p(possible);
  return possible[0];
}

function rotateGiantLaser(map, basex, basey) {
  let destroyed = [];

  for (;;) {
    let asteroids = asteroidsVisible(map, basex, basey);

    let blastList = Object.keys(asteroids).map(key => asteroids[key].sort((a, b) => a[2] - b[2])[0]);

    if (blastList.length === 0) break;

    blastList.forEach(b => b[3] = (b[3] * 360 / Math.PI / 2 + 360) % 360);

    // Doh! None of this degree stuff is necessary, I just had to play with it
    // to figure out what was up with my laser. Obvious in hindsight: because our
    // Y-coordinate is facing down (Y++ moves down the screen), as the angle increases
    // it will move CLOCKWISE not COUNTER-CLOCKWISE as it would in traditional algebra.
    // So, if you want to start with a laser "facing up", that's starting at 270 degrees
    // and increasing in order to circle around the board.
    //
    // The "sorder" is just what to sort by.
    //let sorder = (rad) => Math.PI / 2 - ((rad + Math.PI * 2) % (Math.PI * 2));
    let sorder = (deg) => (deg - 270 + 360) % 360;

    p(blastList);
    p('===');
    blastList.sort((a, b) => sorder(a[3]) - sorder(b[3]));
    p(blastList);

    for (let b of blastList) {
      map[b[1]][b[0]] = '&';
      destroyed.push([b[0], b[1]]);
    }
  }

  return destroyed;
}

export function solve(input: string[]): void {
  //// Part 1 ////
  let map = parseInput(input);
  let result1 = bestAsteroid(map);
  part1(result1);

  //// Part 2 ////
  let result2 = rotateGiantLaser(map, result1[0], result1[1]);
  part2(result2[199][0] * 100 + result2[199][1]);
};
