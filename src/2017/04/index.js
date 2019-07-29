// ------------------------------------------------------------------------
// Year 2017 Day 04
// ------------------------------------------------------------------------
const { log } = require('../../util');

function anagramify(word) {
  let hash = {};
  for (let letter of word) {
    hash[letter] = (hash[letter] || 0) + 1;
  }
  return Object.keys(hash).sort().map(letter => `${letter}${hash[letter]}`).join('');
}

function valid(phrase, anagram = false) {
  let words = phrase.split(' ');
  let hash = {};
  for (let word of words) {
    if (anagram) word = anagramify(word);
    hash[word] = (hash[word] || 0) + 1;
    if (hash[word] > 1) return false;
  }
  return true;
}

module.exports = function solve(lines) {
  //// Part 1 ////
  let result1 = lines.filter(line => valid(line, false)).length;
  log.part1(result1);

  //// Part 2 ////
  let result2 = lines.filter(line => valid(line, true)).length;
  log.part2(result2);
};
