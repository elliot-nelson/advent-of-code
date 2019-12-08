// ------------------------------------------------------------------------
// Year 2019 Day 08
//
// Part 1: A little breather of a puzzle. Split a string, do some
// character counting, produce a number.
//
// Part 2: The classic "print an image of an answer" puzzle.
// ------------------------------------------------------------------------
import { p, part1, part2 } from '../../util';

function splitLayers(input: string[], width: number, height: number): string[] {
  const re = new RegExp(`(.{1,${width*height}})`);
  return input[0].split(re).filter($=>$);
}

function count(str: string, digit: number): number {
  return str.split('').filter(x => String(x) === String(digit)).length;
}

function decode(layers: string[], width: number, height: number): string {
  let result = '';

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let pixel = 2;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i][y*width+x] === '0') {
          pixel = 0; break;
        } else if (layers[i][y*width+x] === '1') {
          pixel = 1; break;
        }
      }
      result += pixel === 0 ? '.' : '#';
    }
    result += '\n';
  }

  return result;
}

export function solve(input: string[]): void {
  //// Part 1 ////
  let layers = splitLayers(input, 25, 6);
  layers.sort((a, b) => count(a, 0) - count(b, 0));
  let result1 = count(layers[0], 1) * count(layers[0], 2);
  part1(result1);

  //// Part 2 ////
  layers = splitLayers(input, 25, 6);
  let result2 = '\n' + decode(layers, 25, 6);
  part2(result2);
};
