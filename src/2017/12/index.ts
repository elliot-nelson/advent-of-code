// ------------------------------------------------------------------------
// Year 2017 Day 12
// ------------------------------------------------------------------------
import { log } from '../../util';

type Entry = { id: number, pipes: number[] };

function parseLine(line: string): Entry {
  let match = line.match(/(.+) <-> (.+)/);
  return {
    id: parseInt(match[1], 10),
    pipes: match[2].split(', ').map(x => parseInt(x, 10))
  };
}

function buildGraph(entries: Entry[]) {
  let hash = new Map<number, number[]>();
  for (let entry of entries) {
    for (let pipe of entry.pipes) {
      let arr = hash.get(entry.id) || [];
      if (!arr.includes(pipe)) arr.push(pipe);
      hash.set(entry.id, arr);
    }
  }
  return hash;
}

function getAllConnected(graph: Map<number, number[]>, root: number) {
  let queue = [root];
  let visited = {};

  while (queue.length > 0) {
    let id = queue.shift(), children = graph.get(id);
    if (!visited[id]) {
      visited[id] = true;
      for (let child of children) queue.push(child);
    }
  }

  return Object.keys(visited).map(id => parseInt(id, 10));
}

function getAllGroups(graph: Map<number, number[]>) {
  let groups = [];
  let remaining = new Set<number>(graph.keys());

  while (remaining.size > 0) {
    let g = getAllConnected(graph, remaining.values().next().value);
    groups.push(g);
    for (let id of g) remaining.delete(id);
  }

  return groups;
}

export function solve(input: string[]) {
  //// Part 1 ////
  let entries = input.map(line => parseLine(line));
  let graph = buildGraph(entries);
  let connected = getAllConnected(graph, 0);
  log.info(connected);
  let result1 = connected.length;
  log.part1(result1);

  //// Part 2 ////
  let allGroups = getAllGroups(graph);
  let result2 = allGroups.length;
  log.part2(result2);
};
