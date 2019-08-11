// ------------------------------------------------------------------------
// Year 2017 Day 10
// ------------------------------------------------------------------------
import { log, sequence, stringToHex } from '../../util';

function getLengths(input: string, asciiMode: boolean) {
  if (asciiMode) {
    let lengths = [];
    for (let i = 0; i < input.length; i++) lengths.push(input.charCodeAt(i));
    lengths.push(17);
    lengths.push(31);
    lengths.push(73);
    lengths.push(47);
    lengths.push(23);
    return lengths;
  } else {
    return input.split(',').map(x => parseInt(x, 10));
  }
}

function circularReverse(list: number[], start: number, end: number) {
  let length = list.length;
  let ptr1 = start, ptr2 = end, swaps = Math.floor(((end - start + 1 + length) % length) / 2);

  while (swaps >= 1) {
    swaps--;
    let t = list[ptr1];
    list[ptr1] = list[ptr2];
    list[ptr2] = t;
    ptr1 = (ptr1 + 1) % length;
    ptr2 = (ptr2 - 1 + length) % length;
  }
}

function round(list: number[], lengths: number[]) {
  let pos = 0;
  let skip = 0;

  for (let i = 0; i < lengths.length; i++) {
    circularReverse(list, pos, (pos + lengths[i] - 1) % list.length);
    pos = (pos + lengths[i] + skip) % list.length;
    skip++;
  }

  return list;
}

function xor(arr: number[]) {
  let value = arr[0];
  for (let i = 1; i < arr.length; i++) value = value ^ arr[i];
  return value;
}

function denseHash(sparseHash: number[]) {
  let result = [];
  for (let i = 0; i < 16; i++) {
    result.push(xor(sparseHash.slice(i * 16, i * 16 + 16)));
  }
  return result;
}

function hexHash(hash: number[]) {
  let str = '';
  for (let i = 0; i < hash.length; i++) str += String.fromCharCode(hash[i]);
  return stringToHex(str);
}

export function solve(input: string[]) {
  //// Part 1 ////
  let lengths = getLengths(input[0], false);
  let list = sequence(0, 255);
  round(list, lengths);
  let result1 = list[0] * list[1];
  log.part1(result1);

  //// Part 2 ////
  lengths = getLengths(input[0], true);
  for (let i = 0; i < 6; i++) lengths = lengths.concat(lengths);  // haha
  list = sequence(0, 255);
  round(list, lengths);
  let result2 = hexHash(denseHash(list));
  log.part2(result2);
};
