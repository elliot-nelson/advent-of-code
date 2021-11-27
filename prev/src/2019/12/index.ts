// ------------------------------------------------------------------------
// Year 2019 Day 12
//
// This took me a bit to wrap my head around (a lot of false assumptions
// and bad starts). The big learning points for me were:
//
// * You don't need the CYCLE TIME (first history point subtracted from
// repeated history point). You only need the number of steps required to
// reach a history point.
// * Calculate that for each axis separately, but for all moons together.
// For 4 moons, that means your "data point" for each axis is 8 numbers -
// the position AND velocity of all the moons in that one axis.
// * Once you get the above right, THEN you can take the LCM straight up.
// ------------------------------------------------------------------------
import { p, part1, part2, draw, fill2d } from '../../util';

function gcd(a = 0, b = 0, ...more) {
  let result = !b ? a : gcd(b, a % b);

  for (let value of more) {
    result = gcd(result, value);
  }

  return result;
}

function lcm(a = 0, b = 0, ...more) {
  let result = (a * b) / gcd(a, b);

  for (let value of more) {
    result = lcm(result, value);
  }

  return result;
}

function step(moons: number[][]) {
  for (let i = 0; i < moons.length; i++) {
    for (let j = i + 1; j < moons.length; j++) {
      if (moons[i][0] < moons[j][0]) {
        moons[i][3]++;
        moons[j][3]--;
      } else if (moons[i][0] > moons[j][0]) {
        moons[i][3]--;
        moons[j][3]++;
      }
      if (moons[i][1] < moons[j][1]) {
        moons[i][4]++;
        moons[j][4]--;
      } else if (moons[i][1] > moons[j][1]) {
        moons[i][4]--;
        moons[j][4]++;
      }
      if (moons[i][2] < moons[j][2]) {
        moons[i][5]++;
        moons[j][5]--;
      } else if (moons[i][2] > moons[j][2]) {
        moons[i][5]--;
        moons[j][5]++;
      }
    }
  }

  for (let i = 0; i < moons.length; i++) {
    moons[i][0] += moons[i][3];
    moons[i][1] += moons[i][4];
    moons[i][2] += moons[i][5];
  }
}

function simulate(moons: number[][], length) {
  let totalEnergy = 0;

  for (let i = 0; i < length; i++) {
    step(moons);

    const a = Math.abs;
    let energy = moons.map(moon => (a(moon[0]) + a(moon[1]) + a(moon[2])) * (a(moon[3]) + a(moon[4]) + a(moon[5])))
      .reduce((total, x) => total + x, 0);
    p(moons, energy);
    totalEnergy = energy;
  }

  return totalEnergy;
}

function findPattern(moons: number[][]) {
  let steps = 0;
  let history = [];
  let cycles = [];

  for (let d = 0; d < 3; d++) {
    history[d] = new Set();
  }

  for (;;) {
    let done = true;
    for (let d = 0; d < 3; d++) {
      if (cycles[d]) continue;
      done = false;
      let key = moons.map(moon => `${moon[d]},${moon[d + 3]}`).join(',');
      if (history[d].has(key)) {
        cycles[d] = steps;
      } else {
        history[d].add(key);
      }
    }
    if (done) break;

    step(moons);
    steps++;
  }

  return cycles;
}

export async function solve(input: string[]): Promise<void> {
  //// Part 1 ////
  let moons = input.map(line => {
    let match = line.match(/<x=(.*), y=(.*), z=(.*)>/);
    let coords = match.slice(1).map(x => parseInt(x, 10));
    return [...coords, 0, 0, 0];
  });

  p(moons);
  let result1 = simulate(moons, 1000);
  part1(result1);

  //// Part 2 ////
  let result2 = findPattern(moons);
  let flattened = result2.reduce((arr, x) => arr.concat(x), []);
  part2(lcm(...flattened));
};
