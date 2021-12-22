// Year 2021 Day xx
// xx

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
    for (let i = 0; i < cuboidSet.length; i++) {
        for (let j = Math.max(i - 50, 0); j < Math.min(i + 50, cuboidSet.length); j++) {
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
        for (const cuboid of cuboidSet) {
            results = results.concat(subtract(cuboid, step));
        }
    } else {
        // To apply an ON instruction, we create a new cuboid set out
        // the incoming cuboid and subtract every existing cuboid from
        // it. If anything is left, it is added to our existing cuboid set.
        //
        // This process is a little more involved than the OFF instruction,
        // because each time we subtract we could end up with more cubes, and
        // each of those cubes also needs to have the remaining cuboids in the
        // set subtracted from it.
        let newSet: Cuboid[] = [step];
        for (const cuboid of cuboidSet) {
            let tempSet: Cuboid[] = [];
            for (const temp of newSet) {
                tempSet = tempSet.concat(subtract(temp, cuboid));
            }
            newSet = tempSet;
        }

        results = cuboidSet.concat(newSet);
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

    let stepNo: number = 0;

    for (let step of steps) {
        stepNo++;
        console.log('step', stepNo, 'cuboids', cuboids.length);

        //if (withinReactorCore(step)) {
            if (true) {
            cuboids = applyStep(cuboids, step);
            cuboids = consolidate(cuboids);
/*
            for (let x = step.x[0]; x <= step.x[1]; x++) {
                for (let y = step.y[0]; y <= step.y[1]; y++) {
                    for (let z = step.z[0]; z <= step.z[1]; z++) {
                        matrix[`${x},${y},${z}`] = (step.instr === 'on' ? 1 : 0);
                    }
                }
            }


            console.log('POST-STEP:');
            let a = Object.values(matrix).reduce((s,v) => s + v);
            let b = cuboids.map(volume).reduce((s, v) => s + v);
            console.log('  Matrix:  ' + a);
            console.log('  Cuboids: ' + b);
            if (a !== b) {
                console.log('bad', step);
                throw 3;
            }
*/
        } else {
            console.log('skip');
        }
    }

    //console.log(cuboids);

    console.log(cuboids.map(volume).reduce((s,v) => s + v, 0));

    /*for (let x of cuboids) {
        console.log(x, volume(x));
    }*/

    //console.log(cuboids.map(volume));

/*
    console.log(steps);

    let a: Cuboid = { x: [0, 10], y: [0, 10], z: [0, 10] };
    //let b: Cuboid = { x: [-4, 4], y: [-4, 4], z: [-4, 4] };
    let b: Cuboid = { x: [-10, 20], y: [-10, 20], z: [0, 9] };

    let c: Cuboid[] = subtract(a,b);

    console.log(subtract(a,b));

    console.log(volume(a));
    console.log(volume(b));
    console.log(volume(a) - volume(b));
    console.log(c.map(volume).reduce((s,v) => s+v));
*/

    // Part 1
    //console.log('part1');
    const part1 = 0;

    // Part 2
    //console.log('part2');
    const part2 = 0;

    return { part1, part2 };
}
