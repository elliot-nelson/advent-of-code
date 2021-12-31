// Year 2021 Day 22
// Reactor Reboot

import { ISolution } from '../../util';

interface Cuboid {
    x: number[];
    y: number[];
    z: number[];
}

interface Step extends Cuboid {
    instr: string;
}

function withinReactorCore(a: Cuboid): boolean {
    return a.x[0] >= -50 && a.x[1] <= 50 &&
           a.y[0] >= -50 && a.y[1] <= 50 &&
           a.z[0] >= -50 && a.z[1] <= 50;
}

function volume(a: Cuboid): number {
    return (a.x[1] - a.x[0] + 1) * (a.y[1] - a.y[0] + 1) * (a.z[1] - a.z[0] + 1);
}

function subtract(a: Cuboid, b: Cuboid): Cuboid[] {
    // If B does not clip A at all, we can return A without any changes.
    if (b.x[1] < a.x[0] || b.x[0] > a.x[1] ||
        b.y[1] < a.y[0] || b.y[0] > a.y[1] ||
        b.z[1] < a.z[0] || b.z[0] > b.z[1]) {
        return [a];
    }

    // If B completely encompasses A, we can return an empty set.
    if (b.x[0] <= a.x[0] && b.x[1] >= a.x[1] &&
        b.y[0] <= a.y[0] && b.y[1] >= a.y[1] &&
        b.z[0] <= a.z[0] && b.z[1] >= a.z[1]) {
        return [];
    }

    // Now the hard part, we have a partial intersection of A and B.
    //
    // For the most complicated case, where B is in the center of A,
    // we can produce up to 26 new "mini cubes" around B. If B is only
    // partially intersecting with A then some of these may not get
    // created, or may be truncated.
    //
    // Note both min and max for each breakpoint, since these are discrete
    // coordinates -- two cuboids "next to" each other should not share the
    // same coordinates (unlike typical 3D math).
    let xBreak = [a.x[0], b.x[0] - 1, b.x[0], b.x[1], b.x[1] + 1, a.x[1]];
    let yBreak = [a.y[0], b.y[0] - 1, b.y[0], b.y[1], b.y[1] + 1, a.y[1]];
    let zBreak = [a.z[0], b.z[0] - 1, b.z[0], b.z[1], b.z[1] + 1, a.z[1]];

    let results: Cuboid[] = [];

    for (let xb = 0; xb < 3; xb++) {
        for (let yb = 0; yb < 3; yb++) {
            for (let zb = 0; zb < 3; zb++) {
                // Skip the "center" cuboid (aka B).
                if (xb === 1 && yb === 1 && zb === 1) continue;

                // Construct each of the 26 proposed cuboids surrounding B in a 3x3 grid,
                // but clipping every axis to the original extents of A. This may result
                // in malformed (negative sized) dimensions.
                let proposal: Cuboid = {
                    x: [Math.max(xBreak[xb * 2], a.x[0]), Math.min(xBreak[xb * 2 + 1], a.x[1])],
                    y: [Math.max(yBreak[yb * 2], a.y[0]), Math.min(yBreak[yb * 2 + 1], a.y[1])],
                    z: [Math.max(zBreak[zb * 2], a.z[0]), Math.min(zBreak[zb * 2 + 1], a.z[1])]
                };

                // We only add this proposal to the list of results if it is well-formed.
                if (proposal.x[1] >= proposal.x[0] &&
                    proposal.y[1] >= proposal.y[0] &&
                    proposal.z[1] >= proposal.z[0]) {
                    results.push(proposal);
                }
            }
        }
    }

    return results;
}

function consolidate(cuboidSet: Cuboid[]): Cuboid[] {
    // In order to avoid an exploding number of cuboids, which slows the
    // progress down to a crawl about halfway to the solution, we can try to
    // "consolidate" cuboids that have identical sizes in 2 axes and are next
    // to each other in the remaining axis.
    //
    // This SIGNIFICANTLY decreases number of cuboids (for example, around Step 250
    // in my input, brings number down from ~4500 to ~1200).
    //
    // However doing this cleanup adds its own expensive N*N operation... I've tried
    // to limit that by only looking +/-30 cuboids from your own cuboid in the list,
    // but the right answer is probably to make the logic in the subtract function
    // above smarter (i.e..... way more complicated).
    for (let i = 0; i < cuboidSet.length; i++) {
        for (let j = Math.max(i - 30, 0); j < Math.min(i + 30, cuboidSet.length); j++) {
            let a = cuboidSet[i], b = cuboidSet[j];

            if (a.x[0] === b.x[0] && a.x[1] === b.x[1] &&
                a.y[0] === b.y[0] && a.y[1] === b.y[1] &&
                a.z[1] === b.z[0] - 1) {
                cuboidSet[i] = {
                    x: a.x,
                    y: a.y,
                    z: [a.z[0], b.z[1]]
                };
                cuboidSet.splice(j--, 1);
                break;
            }

            if (a.x[0] === b.x[0] && a.x[1] === b.x[1] &&
                a.y[1] === b.y[0] - 1 &&
                a.z[0] === b.z[0] && a.z[1] === b.z[1]) {
                cuboidSet[i] = {
                    x: a.x,
                    y: [a.y[0], b.y[1]],
                    z: a.z
                };
                cuboidSet.splice(j--, 1);
                break;
            }

            if (a.x[1] === b.x[0] - 1 &&
                a.y[0] === b.y[0] && a.y[1] === b.y[1] &&
                a.z[0] === b.z[0] && a.z[1] === b.z[1]) {
                cuboidSet[i] = {
                    x: [a.x[0], b.x[1]],
                    y: a.y,
                    z: a.z
                };
                cuboidSet.splice(j--, 1);
                break;
            }
        }
    }

    return cuboidSet;
}

function applyStep(cuboidSet: Cuboid[], step: Step): Cuboid[] {
    let results: Cuboid[] = [];

    if (step.instr === 'off') {
        // To apply an OFF instruction, we take the input cuboid and
        // subtract it from every existing cuboid in the set.
        //
        // Note the "mini consolidation" of the new set of cuboids we are adding.
        let newSet: Cuboid[] = [];
        for (const cuboid of cuboidSet) {
            newSet.push(...subtract(cuboid, step));
        }
        results = results.concat(consolidate(newSet));

            //results = results.concat(consolidate(subtract(cuboid, step)));
        //}
    } else {
        // To apply an ON instruction, we create a new cuboid set out
        // the incoming cuboid and subtract every existing cuboid from
        // it. If anything is left, it is added to our existing cuboid set.
        //
        // This process is a little more involved than the OFF instruction,
        // because each time we subtract we could end up with more cubes, and
        // each of those cubes also needs to have the remaining cuboids in the
        // set subtracted from it.
        //
        // Note the "mini consolidation" of the new set of cuboids we are adding.
        // (Helps the overall time considerably, cuts it down from ~30s to ~16s).
        let newSet: Cuboid[] = [step];
        for (const cuboid of cuboidSet) {
            let tempSet: Cuboid[] = [];
            for (const temp of newSet) {
                tempSet = tempSet.concat(subtract(temp, cuboid));
            }
            newSet = tempSet;
        }

        results = cuboidSet.concat(consolidate(newSet));
    }

    return results;
}

export function solve(input: string[]): ISolution<number> {
    const steps: Step[] = input.map(line => {
        const elements = line.match(/(.+) x=(.+)\.\.(.+),y=(.+)\.\.(.+),z=(.+)\.\.(.+)/)!;
        return {
            instr: elements[1],
            x: elements.slice(2, 4).map(Number),
            y: elements.slice(4, 6).map(Number),
            z: elements.slice(6, 8).map(Number)
        };
    });

    let cuboids: Cuboid[] = [];

    for (let step of steps) {
        cuboids = applyStep(cuboids, step);
        cuboids = consolidate(cuboids);
    }

    // Part 1
    const part1: number = cuboids.filter(withinReactorCore).map(volume).reduce((sum, value) => sum + value);

    // Part 2
    const part2: number = cuboids.map(volume).reduce((sum, value) => sum + value);

    return { part1, part2 };
}
