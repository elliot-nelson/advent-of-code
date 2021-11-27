// ------------------------------------------------------------------------
// Year YYYY Day DD
// ------------------------------------------------------------------------
import { p, part1, part2 } from '../../util';

interface Entry {
  id: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface State {
  map: number[][];
  claims: Entry[];
}

function buildState(input: string[]): State {
  let map = [];
  let claims = [];
  for (let i = 0; i < input.length; i++) {
      let match = input[i].match(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
      let k = match.slice(1).map(x => parseInt(x, 10));
      claims.push(k);
      claim(map, k[1], k[2], k[3], k[4]);
  }

  return { map, claims };
}

function claim(map: number[][], x: number, y: number, w: number, h: number): void {
  for (let j = 0; j < h; j++) {
    for(let i = 0; i < w; i++) {
      if (!map[y+j]) map[y+j] = [];
      if (!map[y+j][x+i]) map[y+j][x+i] = 0;
      map[y+j][x+i]++;
    }
  }
}

function hasOverlap(map: number[][], x: number, y: number, w: number, h: number): boolean {
  for (let j = 0; j < h; j++) {
      for(let i = 0; i < w; i++) {
          if (map[y+j][x+i] > 1) return true;
      }
  }
  return false;
}

function count(map: number[][]): number {
    let inches = 0;
    for (let j = 0; j < map.length; j++) {
        for (let i = 0; i < (map[j]||[]).length; i++) {
            if (map[j][i] > 1) inches++;
        }
    }

    return inches;
}

function findId({ map, claims }: State): number {
  for (let i = 0; i < claims.length; i++) {
    if (!hasOverlap(map, claims[i][1], claims[i][2], claims[i][3], claims[i][4])) {
      return claims[i][0];
    }
  }
}

export function solve(input: string[]): void {
  //// Part 1 ////
  let state = buildState(input);
  let result1 = count(state.map);
  part1(result1);

  //// Part 2 ////
  let result2 = findId(state);
  part2(result2);
};
