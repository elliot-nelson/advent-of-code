// Year 2021 Day 08
// Seven Segment Search

import { ISolution } from '../../util';

type Entry = {
    patterns: Set<string>[];
    outputs: Set<string>[];
}

// In a normal language the concepts of equality, intersection, difference,
// etc. would already be available for Sets... but this is JavaScript!

function setEqual(a: Set<string>, b: Set<string>): boolean {
    return a.size === b.size && setContainsAll(a, b);
}

function setContainsAll(a: Set<string>, b: Set<string>): boolean {
    return [...b].every(segment => a.has(segment));
}

function setDifference(a: Set<string>, b: Set<string>): Set<string> {
    return new Set([...a].filter(segment => !b.has(segment)));
}

export function solve(input: string[]): ISolution<number> {
    const entries: Entry[] = input.map(line => {
        const elements = line.split(' ');

        return {
            patterns: elements.slice(0, 10).map(signal => new Set([...signal])),
            outputs: elements.slice(11, 15).map(signal => new Set([...signal]))
        };
    });

    const digitAppearances: number[] = [];
    const decodedOutputs: number[] = [];

    for (const entry of entries) {
        const signals: Set<string>[] = [];

        // We start with the "easy" signals, identifiable by their unique
        // number of segments.
        signals[1] = entry.patterns.find(signal => signal.size === 2)!;
        signals[4] = entry.patterns.find(signal => signal.size === 4)!;
        signals[7] = entry.patterns.find(signal => signal.size === 3)!;
        signals[8] = entry.patterns.find(signal => signal.size === 7)!;

        // Next we tackle the signals with 6 segments, which we can identify
        // by whether or not they are supersets of signals above.
        const sixSegmentSignals: Set<string>[] = entry.patterns.filter(signal => signal.size === 6);
        signals[9] = sixSegmentSignals.find(signal => setContainsAll(signal, signals[4]))!;
        signals[0] = sixSegmentSignals.find(signal => setContainsAll(signal, signals[1]) && signal !== signals[9])!;
        signals[6] = sixSegmentSignals.find(signal => signal !== signals[9] && signal !== signals[0])!;

        // To get the remaining signals, we need to do some intermediate set
        // operations to isolate individual segments.
        //
        // (I call these "dSegment", "aSegment", etc., as a reference to the
        // diagram included in the puzzle explanation, even though for each
        // entry "dSegment" is some unknown letter.)
        const dSegment: Set<string> = setDifference(signals[8], signals[0]);
        const aSegment: Set<string> = setDifference(signals[7], signals[1]);
        const gSegment: Set<string> = setDifference(setDifference(signals[9], signals[4]), signals[7]);
        const eSegment: Set<string> = setDifference(signals[8], signals[9]);
        const cSegment: Set<string> = setDifference(signals[8], signals[6]);
        const fSegment: Set<string> = setDifference(signals[1], cSegment);

        signals[5] = setDifference(signals[9], cSegment);
        signals[2] = new Set([...aSegment, ...cSegment, ...dSegment, ...eSegment, ...gSegment]);
        signals[3] = new Set([...setDifference(signals[2], eSegment), ...fSegment]);

        // Finally, we can interpret the output for this entry, decoding the output
        // signals into a number and also tracking the number of appearances of each
        // digit across all outputs (for Part 1).
        const outputDigits: number[] = [];
        for (const output of entry.outputs) {
            const digit: number = signals.findIndex(signal => setEqual(output, signal));
            outputDigits.push(digit);
            digitAppearances[digit] = (digitAppearances[digit] || 0) + 1;
        }
        decodedOutputs.push(Number(outputDigits.join('')));
    }

    // Part 1
    const part1: number = digitAppearances[1] + digitAppearances[4] + digitAppearances[7] + digitAppearances[8];

    // Part 2
    const part2: number = decodedOutputs.reduce((sum, value) => sum + value, 0);

    return { part1, part2 };
}
