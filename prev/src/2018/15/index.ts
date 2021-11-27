// ------------------------------------------------------------------------
// Year 2018 Day 15
//
// Part 1: Wow! Multi-hour solve for me. I had some false starts because
// it appears that you can take some shortcuts but you really do need to
// follow the puzzle instructions step by step. The examples were a must
// for confirming behavior is correct. I chose to do a (probably) slower
// but easier double-flood-fill: first I flood fill from the player to
// find the target movement points, then I flood fill backwards to the
// player to determine what move to make. You could trade space for time
// and keep the lowest-cost chains in the first flood fill, and select
// from that based on "reading order".
//
// My second delay was caused by not reading the instructions (doh) -
// I didn't realize you could move AND attack in one turn. Luckily this
// easy to fix once I realized it. To troubleshoot this I ended up building
// the exact output rendering the puzzle uses (which is fun to look at,
// although it's currently commented out in the code below).
//
// Part 2: Pretty easy! Reuse the function you already made, wrap it in
// another loop, and you're good to go.
// ------------------------------------------------------------------------
import { log } from '../../util';

// I'll take things that have X,Y components for $200
interface Point {
  x: number;
  y: number;
}

// The combatants
interface Entity extends Point {
  team: string;
  hp: number;
  attack: number;
}

// Flood fill targets (cost = distance to or from)
interface Fill extends Point {
  cost: number;
}

// Power definition (for goblins and elves)
interface Power {
  E: number;
  G: number;
}

// Our state object, contains the map we're fighting on and entity state
interface State {
  map: string[][];
  entities: Entity[];
}

function createState(originalMap: string[][], power: Power): State {
  let entities = [], map = [];

  for (let y = 0; y < originalMap.length; y++) {
    let row = originalMap[y].concat();
    for (let x = 0; x < row.length; x++) {
      if (row[x] === 'G' || row[x] === 'E') {
        entities.push({ x, y, team: row[x], hp: 200, attack: power[row[x]] });
        row[x] = '.';
      }
    }
    map.push(row);
  }

  return { map, entities };
}

function sortYX(list: Point[]): void {
  list.sort((a, b) => a.y === b.y ? a.x - b.x : a.y - b.y);
}

function selectAttackTarget(entity: Entity, state: State): Entity {
  // Determine all possible "targets" - adjacent enemies
  let targets = state.entities.filter(e => e.team !== entity.team);
  targets = targets.filter(e => {
    return (e.x === entity.x - 1 && e.y === entity.y) ||
           (e.x === entity.x + 1 && e.y === entity.y) ||
           (e.x === entity.x && e.y === entity.y - 1) ||
           (e.x === entity.x && e.y === entity.y + 1);
  });

  // Sort targets by HP, then YX
  targets.sort((a, b) => {
    if (a.hp === b.hp) {
      if (a.y === b.y) {
        return a.x - b.x;
      }
      return a.y - b.y;
    }
    return a.hp - b.hp;
  });

  return targets[0];
}

function selectTargetSquare(entity: Entity, state: State): Fill {
  let visited = state.map.map(row => []);
  let targets = [];
  let queue = [{ x: entity.x, y: entity.y, cost: 0 }];

  // Determine all possible "targets" - empty map squares next to enemy units
  for (let possible of state.entities.filter(e => e.team !== entity.team)) {
    [
      { x: possible.x, y: possible.y - 1 },
      { x: possible.x - 1, y: possible.y },
      { x: possible.x + 1, y: possible.y },
      { x: possible.x, y: possible.y + 1 }
    ].forEach(p => {
      if (state.map[p.y][p.x] === '.' && !state.entities.find(e => e.x === p.x && e.y === p.y)) {
        targets.push(p);
      }
    });
  }

  // Standard flood fill, marking possible targets with cost when we reach them
  while (queue.length > 0) {
    let p = queue.shift();

    // No backtracking
    if (visited[p.y][p.x] === undefined) {
      visited[p.y][p.x] = p.cost;
    } else {
      continue;
    }

    // No walking through walls
    if (state.map[p.y][p.x] === '#') continue;

    // No walking through units (friendlies or enemies)
    let unit = state.entities.find(u => u.x === p.x && u.y === p.y);
    if (p.cost === 0 || !unit) {
      queue.push({ x: p.x, y: p.y - 1, cost: p.cost + 1 });
      queue.push({ x: p.x - 1, y: p.y, cost: p.cost + 1 });
      queue.push({ x: p.x + 1, y: p.y, cost: p.cost + 1 });
      queue.push({ x: p.x, y: p.y + 1, cost: p.cost + 1 });
    }

    for (let target of targets) {
      if (target.x === p.x && target.y === p.y) target.cost = p.cost;
    }
  }

  // Return if there's no accessible targets
  targets = targets.filter(target => target.cost !== undefined);
  if (targets.length === 0) return;

  // Find the lowest possible cost, and filter to targets with that cost
  targets.sort((a, b) => a.cost - b.cost);
  targets = targets.filter(target => target.cost === targets[0].cost);

  // Select the YX-ordered matching target
  sortYX(targets);
  return targets[0];
}

function selectMovement(entity: Entity, targetSquare: Fill, state: State) {
  let visited = state.map.map(row => []);
  let queue = [{ x: targetSquare.x, y: targetSquare.y, cost: 1 }];

  // Standard flood fill
  while (queue.length > 0) {
    let p = queue.shift();

    // No backtracking
    if (visited[p.y][p.x] === undefined) {
      visited[p.y][p.x] = -1;
    } else {
      continue;
    }

    // No walking through walls
    if (state.map[p.y][p.x] === '#') continue;

    // No walking through units (friendlies or enemies)
    let unit = state.entities.find(u => u.x === p.x && u.y === p.y);
    if (p.cost === 0 || !unit) {
      visited[p.y][p.x] = p.cost;
      queue.push({ x: p.x, y: p.y - 1, cost: p.cost + 1 });
      queue.push({ x: p.x - 1, y: p.y, cost: p.cost + 1 });
      queue.push({ x: p.x + 1, y: p.y, cost: p.cost + 1 });
      queue.push({ x: p.x, y: p.y + 1, cost: p.cost + 1 });
    }
  }

  // Now that we've flooded the board, select from our possible moves
  let moves = [
    { x: entity.x, y: entity.y - 1, cost: visited[entity.y - 1][entity.x] },
    { x: entity.x - 1, y: entity.y, cost: visited[entity.y][entity.x - 1] },
    { x: entity.x + 1, y: entity.y, cost: visited[entity.y][entity.x + 1] },
    { x: entity.x, y: entity.y + 1, cost: visited[entity.y + 1][entity.x] }
  ].filter(m => m && m.cost > 0);
  moves.sort((a, b) => {
    if (a.cost === b.cost) {
      if (a.y === b.y) {
        return a.x - b.x;
      }
      return a.y - b.y;
    }
    return a.cost - b.cost;
  });
  return moves[0];
}

// A single round of combat, returning TRUE if this round was a complete, successful
// round, and FALSE otherwise.
function performRound(state: State): boolean {
  sortYX(state.entities);

  if (state.entities.length === 0) return false;

  for (let i = 0; i < state.entities.length; i++) {
    let entity = state.entities[i];

    // Immediately abort this round if no enemies remain
    if (state.entities.filter(e => e.team !== entity.team).length === 0) return false;

    let attackTarget = selectAttackTarget(entity, state);

    // If not in range, try to move
    if (!attackTarget) {
      let targetSquare = selectTargetSquare(entity, state);
      if (targetSquare) {
        let moveSquare = selectMovement(entity, targetSquare, state);
        entity.x = moveSquare.x;
        entity.y = moveSquare.y;
      }
      attackTarget = selectAttackTarget(entity, state);
    }

    // After moving, we may have moved into range
    if (attackTarget) {
      attackTarget.hp -= entity.attack;
      if (attackTarget.hp <= 0) {
        // This is a super error-prone way to do this (removing an entity in the
        // middle of processing). A better way would be to just remove all entities
        // with no HP afterwards in a separate filter; however, all the rest of my
        // code would need to be adjusted to not treat entities with no HP as blocking
        // the board, etc. This is just an easy hack.
        let idx = state.entities.indexOf(attackTarget);
        state.entities.splice(idx, 1);
        if (idx <= i) i--;
      }
    }
  }

  return true;
}

// Draw current state, like on the puzzle page
function render(state: State): string {
  let map = state.map.map(row => row.concat());
  let data = state.map.map(row => []);
  for (let entity of state.entities) {
    map[entity.y][entity.x] = entity.team;
    data[entity.y].push(`${entity.team}(${entity.hp})`);
  }

  return map.reduce((string, row, idx) => string + '\n' + row.join('') + '    ' + data[idx].join(', '), '');
}

// Perform the entier battle and return the "result" (HP * Rounds).
function performBattle(state: State): number {
  let roundsCompleted = 0;

  for (;;) {
    if (performRound(state)) {
      roundsCompleted++;
      // Uncomment for per-round output
      // console.log(render(state));
    } else {
      // Uncomment for end-of-battle output
      // console.log(render(state));
      break;
    }
  }

  let remainingHp = state.entities.reduce((total, entity) => total += entity.hp, 0);
  return remainingHp * roundsCompleted;
}

// For Part 2, repeatedly perform the battle until elves have no losses
function findLowestElfPower(input: string[]): number {
  let elfPower = 4;

  for (;;) {
    let state = createState(input.map(line => line.split('')), { E: elfPower, G: 3 });
    let elves = state.entities.filter(e => e.team === 'E').length;
    let result = performBattle(state);
    if (state.entities.filter(e => e.team === 'E').length === elves) {
      return result;
    }
    elfPower++;
  }
}

export function solve(input: string[]) {
  //// Part 1 ////
  let state = createState(input.map(line => line.split('')), { E: 3, G: 3 });
  let result1 = performBattle(state);
  log.part1(result1);

  //// Part 2 ////
  let result2 = findLowestElfPower(input);
  log.part2(result2);
};
