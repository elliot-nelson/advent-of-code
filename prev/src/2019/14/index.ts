// ------------------------------------------------------------------------
// Year 2019 Day 14
//
// Came back and did this one after the fact. This is most likely not the
// most efficient solution, since I'm collecting a non-efficient plan and
// then optimizing it to get the accurate ore usage.
// ------------------------------------------------------------------------
import { p, part1, part2 } from '../../util';

function parseChemical(ingredient) {
  let k = ingredient.split(' ');
  return {
    quantity: parseInt(k[0], 10),
    chemical: k[1]
  };
}

function parseInput(input: string[]) {
  let reactions = [];

  return input.map(line => {
    let [from, to] = line.split(' => ');
    return {
      inputs: from.split(', ').map(x => parseChemical(x)),
      output: parseChemical(to)
    };
  });
}

function reactionFor(reactions, chemical) {
  return reactions.find(r => r.output.chemical === chemical);
}

function minimumReactionsNecessary(reaction, quantityNeeded) {
  return Math.ceil(quantityNeeded / reaction.output.quantity);
}

// Recursively build up a list of how many reactions we'll run for each
// individual reaction. This doesn't take into account the fact that
// multiple different reactions can take the same inputs, which means
// we are probably generating more stuff than we need...
function buildPlan(reactions, quantity, chemical) {
  if (chemical === 'ORE') return {};

  let r = reactionFor(reactions, chemical);
  let q = minimumReactionsNecessary(r, quantity);
  let hist = {};

  for (let input of r.inputs) {
    let plan = buildPlan(reactions, q * input.quantity, input.chemical);
    Object.keys(plan).forEach(key => {
      hist[key] = (hist[key] || 0) + plan[key];
    });
  }

  hist[chemical] = (hist[chemical] || 0) + q;
  return hist;
}

// Given a plan (a plan is just a list of how many of each reaction we
// will perform), produce a hash of the total surplus produced of each
// element. ("Surplus" meaning total produced minus total consumed.)
function determineSurplus(reactions, plan) {
  let surplus = {};

  for (let chemical of Object.keys(plan)) {
    let r = reactionFor(reactions, chemical);
    surplus[chemical] = (surplus[chemical] || 0) + plan[chemical] * r.output.quantity;

    for (let input of r.inputs) {
      surplus[input.chemical] = (surplus[input.chemical] || 0) - plan[chemical] * input.quantity;
    }
  }

  // The goal is to produce 1 FUEL
  surplus['FUEL'] = 0;

  return surplus;
}

// Given a non-minimized plan, repeatedly find the first chemical that has
// a surplus we could reduce and reduce it.
function minimizePlan(reactions, plan) {
  for (;;) {
    let surplus = determineSurplus(reactions, plan);
    let reduced = false;
    for (let key of Object.keys(surplus)) {
      let r = reactionFor(reactions, key);
      if (r && surplus[key] >= r.output.quantity) {
        plan[key] -= Math.floor(surplus[key] / r.output.quantity);
        reduced = true;
      }
    }

    // We couldn't find any reductions, so we're done!
    if (!reduced) break;
  }

  return plan;
}

function maximumFuelFor(reactions, oreAvailable) {
  // Throw out a totally random guess as to how much fuel we can produce
  let fuelProduced = 1000;

  for (;;) {
    // In each round, determine the ore cost for this fuel
    let plan = buildPlan(reactions, fuelProduced, 'FUEL');
    plan = minimizePlan(reactions, plan);
    let s = determineSurplus(reactions, plan);
    let cost = -s['ORE'];

    // Using a guesstimated ore-per-fuel, take the difference
    // between how much ore we have available to spend and how
    // much we've spent. (This means we'll naturally add massive
    // amounts to our fuel guess early, getting smaller as we
    // get closer.)
    let orePerFuel = cost / fuelProduced;
    let change = Math.floor((oreAvailable - cost) / orePerFuel);
    fuelProduced += change;

    // If change is less than 0, it means we WERE over the oreAvailable
    // limit and just dipped back under again. That means the current
    // fuelProduced value is the maximum fuel we could produce without
    // going over the oreAvailable limit.
    if (change < 0) return fuelProduced;
  }
}

export function solve(input: string[]): void {
  //// Part 1 ////
  let reactions = parseInput(input);
  let plan = buildPlan(reactions, 1, 'FUEL');
  plan = minimizePlan(reactions, plan);

  // Once we have a minimized plan, the "ore cost" is just the ORE
  // surplus, sign-flipped.
  let result1 = -determineSurplus(reactions, plan)['ORE'];
  part1(result1);

  //// Part 2 ////
  let result2 = maximumFuelFor(reactions, 1000000000000);
  part2(result2);
};
