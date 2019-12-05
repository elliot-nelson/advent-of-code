# Advent of Code

> Yet another Advent of Code solution collection, written in JavaScript/TypeScript.

## What is this?

My personal, just-for-fun archive of solutions for [Eric Wastl's](https://twitter.com/ericwastl) Advent of Code puzzles.

## My approach

I'm a fan of the adrenaline rush of solving the puzzle when it goes live, so don't expect a lot of nuance: my
solutions tend to be straightforward brute force, unless I'm particularly inspired or happen to have a
different approach in my back pocket already.

After the dust settles, I'll take my initial mess and clean up the naming, add in types, remove extra console
logging, etc., and then check it in. So what you see here might not be exactly what I ran the night of the
puzzle, but it should be close.

## Solution runner

I use a home-grown solution runner that lets me focus on editing code (and seeing whether it compiles, runs,
and produces an output in my background terminal window). I could use out-of-the-box gulp watch or something,
but I really want my particular input handling -- every time I save a `.txt` file in the folder for the
day's challenge, my runner will switch to that input, allowing me to quickly test different example inputs
when I'm debugging a problem in my code.

Run the solution for a puzzle:

    ./solve.ts 2017 05

> This executes the solution `src/2017/05/index.js` against `src/2017/05/input.txt`.

Provide an alternate input file:

    ./solve.ts 2017 05 --input src/2017/05/example1.txt

> If you want to run a one-off example input.

Watch mode:

    ./solve.ts 2017 05 --watch

> My default mode when solving a puzzle. Automatically switches input files as they
> are saved in the puzzle folder.

Initialize an empty puzzle folder:

    ./solve.ts 2017 05 --init

> Creates template `index.js` and `input.txt` files in the desired folder.
