// Year 2021 Day 19
// Beacon Scanner

import { ISolution } from '../../util';

// A "scanner match", generated when we find a field that overlaps another
// field. In this case we want to return a translated, reoriented field of
// beacons (in the coordinate system of the first scanner), and the calculated
// position of the scanner (in the coordinate system of the first scanner).

type ScannerMatch = {
    scanner: number[];
    beacons: number[][];
}

// Utility functions

function countMatches(a: number[][], b: number[][]): number {
    let matches: number = 0;

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
            if (a[i][0] === b[j][0] && a[i][1] === b[j][1] && a[i][2] === b[j][2]) {
                matches++;
                break;
            }
        }
    }

    return matches;
}

function difference(a: number[], b: number[]): number[] {
    return [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
}

function translate(a: number[], b: number[]): number[] {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function reorient(pos: number[], orientation: number) {
    const [x, y, z] = pos;

    // For me, getting all 24 orientations "right" was the hardest part
    // of this puzzle. Someone better at 3d or matrix math might generate these
    // on the fly instead of painstakingly mapping out the translations.
    switch (orientation) {
        case 0: return [-z, y, x];
        case 1: return [y, z, x];
        case 2: return [z, -y, x];
        case 3: return [-y, -z, x]

        case 4: return [z, y, -x];
        case 5: return [-y, z, -x];
        case 6: return [-z, -y, -x];
        case 7: return [y, -z, -x];

        case 8: return [x, -z, y];
        case 9: return [-z, -x, y];
        case 10: return [-x, z, y];
        case 11: return [-z, x, y];

        case 12: return [x, z, -y];
        case 13: return [-z, x, -y];
        case 14: return [-x, -z, -y];
        case 15: return [z, -x, -y];

        case 16: return [x, y, z];
        case 17: return [y, -x, z];
        case 18: return [-x, -y, z];
        case 19: return [-y, x, z];

        case 20: return [-x, y, -z];
        case 21: return [y, x, -z];
        case 22: return [x, -y, -z];
        case 23: return [-y, -x, -z];
    }
}

function overlayBeaconFields(a: number[][], b: number[][]): ScannerMatch | undefined {
    for (let o = 0; o < 24; o++) {
        const bOriented: number[][] = b.map(x => reorient(x, o)!);

        for (let i = 0; i < b.length; i++) {
            for (let j = 0; j < a.length; j++) {
                const diff: number[] = difference(bOriented[i], a[j]);
                const bTranslated: number[][] = bOriented.map(x => translate(x, diff));

                let matches = countMatches(a, bTranslated);
                if (matches >= 12) {
                    return {
                        scanner: diff,
                        beacons: bTranslated
                    };
                }
            }
        }
    }

    return undefined;
}

export function solve(input: string[]): ISolution<number> {
    const beaconFields: number[][][] = input.join('\n').split('\n\n').map(section => {
        return section.split('\n').slice(1).map(line => line.split(',').map(Number));
    });

    console.log('hey');

    // If a field hasn't been translated into the coordinate system of Field 0,
    // it's "unknown". As we find matches and translate/orient beacon fields into
    // the coordinate system of Field 0, they become known.
    const known: number[][][] = beaconFields.slice(0, 1);
    const unknown: number[][][] = beaconFields.slice(1);
    const scanners: number[][] = [
        [0, 0, 0]
    ];

    console.log('mook');

    while (unknown.length > 0) {
        console.log('known', known.length, 'unknown', unknown.length);
        for (let i = 0; i < known.length; i++) {
            for (let j = 0; j < unknown.length; j++) {
                let field = overlayBeaconFields(known[i], unknown[j]);
                if (field) {
                    console.log('FIELD');
                    scanners.push(field.scanner);
                    known.push(field.beacons);
                    unknown.splice(j, 1);
                    break;
                }
            }
        }
    }


    // Part 1
    const allBeacons: number[][] = [];
    for (let field of known) {
        for (let entry of field) {
            if (!allBeacons.find(x => x[0] === entry[0] && x[1] === entry[1] && x[2] === entry[2])) {
                allBeacons.push(entry);
            }
        }
    }
    const part1 = allBeacons.length;

    // Part 2
    let maxDist = 0;
    for (let i = 0; i < scanners.length; i++) {
        for (let j = 0; j < scanners.length; j++) {
            let dist = Math.abs(scanners[j][0] - scanners[i][0]) +
                Math.abs(scanners[j][1] - scanners[i][1]) +
                Math.abs(scanners[j][2] - scanners[i][2]);
            if (dist > maxDist) maxDist = dist;
        }
    }
    const part2 = maxDist;

    return { part1, part2 };
}
