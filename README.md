# Advent of Code

> Yet another Advent of Code solution collection, written in JavaScript/TypeScript.

## What is this?

My personal just-for-fun archive of solutions for [Eric Wastl's](https://twitter.com/ericwastl) Advent of Code puzzles.

## My approach

I'm a fan of the adrenaline rush of solving the puzzle when it goes live, so don't expect a lot of nuance: my
solutions tend to be straightforward brute force, unless I'm particularly inspired or happen to have a
different approach in my back pocket already.

After the dust settles, I might clean up my code (naming, debris), but I don't change the algorithm used.
(Although for the interesting puzzles I have considered it -- I'll update this section if this ever changes.)

## Solution runner

Run the solution for a puzzle:

    ./solve.ts 2017 05

> This executes the solution `src/2017/05/index.js` against `src/2017/05/input.txt`.

Provide an alternate input file:

    ./solve.ts 2017 05 --input src/2017/05/example1.txt

> Uncommon, but for tougher puzzles copying some of the small example inputs in the
> puzzle description can help identify the issue in my solution.

Watch mode:

    ./solve.ts 2017 05 --watch

> My default mode when solving a puzzle.

Initialize an empty puzzle folder:

    ./solve.ts 2017 05 --init

> Creates template `index.js` and `input.txt` files in the desired folder.
