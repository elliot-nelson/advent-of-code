// ------------------------------------------------------------------------
// Year 2017 Day 07
// ------------------------------------------------------------------------
const { log, sum } = require('../../util');

function getNode(input) {
  let [name, weight, children] = input.match(/(.+) \((\d+)\)(?: -> )?(.*)/).slice(1);
  return {
    name: name,
    weight: parseInt(weight, 10),
    children: children ? children.split(', ') : []
  };
}

function buildTree(input) {
  let nodes = input.map(line => getNode(line));
  let hash = {};
  for (let node of nodes) hash[node.name] = node;

  for (let node of nodes) {
    node.children = node.children.map(name => hash[name]);
    for (let child of node.children) {
      delete hash[child.name];
    }
  }

  return hash[Object.keys(hash)[0]];
}

function addWeights(node) {
  node.totalWeight = node.weight + sum(...node.children.map(x => addWeights(x)));
  return node.totalWeight;
}

function findMismatch(node, desiredWeight) {
  // Since we KNOW only one subtree can be off, and there must be at least 3,
  // we can cheat by just sorting by total weight and selecting 1 from the left.
  // (Since the "bad node" will always be either the furthest left or furthest
  // right after we finish sorting.)
  node.children.sort((a, b) => a.totalWeight - b.totalWeight);
  let correctWeight = node.children[1].totalWeight;

  let badNode = node.children.filter(x => x.totalWeight !== correctWeight);

  if (badNode.length === 1) {
    return findMismatch(badNode[0], correctWeight);
  } else {
    // Once we find a node that is wrong, but all the children are correctly
    // balanced, that means THIS node's weight is off. And we can use the difference
    // between the desired weight of the previous layer and this node's total
    // weight to figure out what to add to it.
    return node.weight - node.totalWeight + desiredWeight;
  }
}

module.exports = function solve(lines) {
  let tree = buildTree(lines);
  addWeights(tree);

  //// Part 1 ////
  let result1 = tree.name;
  log.part1(result1);

  //// Part 2 ////
  let result2 = findMismatch(tree);
  log.part2(result2);
};
