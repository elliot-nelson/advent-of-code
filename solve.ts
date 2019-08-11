#!/usr/bin/env ts-node

// ------------------------------------------------------------------------
// solver cli
// ------------------------------------------------------------------------
import chalk from 'chalk';
import * as fse from 'fs-extra';
import * as glob from 'glob';
import { sprintf } from 'sprintf-js';
import * as yargs from 'yargs';
import * as chokidar from 'chokidar';
import * as readline from 'readline';

function puzzleFolder(year: number, day: number) {
  return sprintf('src/%04d/%02d', year, day);
}

function puzzleTitle(year: number, day: number) {
  return sprintf('Year %04d Day %02d', year, day);
}

function solve(year: number, day: number, input: string) {
  let startTime = new Date().getTime();
  let folder = puzzleFolder(year, day);

  console.log('Solving ' + chalk.yellow(puzzleTitle(year, day)) + ' (input=' + input + ')');

  let lines = fse.readFileSync(`${folder}/${input}`, 'utf8').split('\n');
  if (lines[lines.length - 1].length === 0) lines.pop();

  let solution = require(sprintf('./src/%04d/%02d', year, day));

  // Support both "module.exports = function" and "export function"
  solution.solve ? solution.solve(lines) : solution(lines);

  let endTime = new Date().getTime();
  console.log(sprintf('Finished (%07.4f seconds)', (endTime - startTime) / 1000));
}

// Rather than instantiating a typescript compiler ourselves and running
// it on file change, we run the solver in ts-node and rely on require'ing
// and clearing the require cache.
//
// Both approaches work, but the nice thing about the ts-node approach is that
// when the solution blows up, ts-node handles the stack trace sourcemapping
// for you...
function clearCache() {
  let re = new RegExp(process.cwd() + '/src');
  Object.keys(require.cache).filter(key => re.test(key)).forEach(key => {
    delete require.cache[key];
  });
}

function initPuzzle(year: number, day: number) {
  let folder = puzzleFolder(year, day);

  if (fse.existsSync(`${folder}/index.js`) || fse.existsSync(`${folder}/index.ts`)) {
    throw new UsageError('Cannot initialize existing puzzle solution.');
  }

  fse.mkdirpSync(folder);
  fse.copyFileSync('src/template.ts', `${folder}/index.ts`);
  fse.writeFileSync(`${folder}/input.txt`, 'Happy Holidays!');
  console.log('Initialized puzzle for ' + chalk.yellow(puzzleTitle(year, day)));
}

class UsageError extends Error { }

class Watcher {
  private chokky: chokidar.FSWatcher;
  private rl: readline.Interface;
  private inputs: string[];
  private currentInput: string;
  private year: number;
  private day: number;

  constructor(year: number, day: number, input: string) {
    this.year = year;
    this.day = day;
    this.currentInput = input;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    this.chokky = chokidar.watch('src');
    this.chokky.on('ready', () => {
      this.chokky.on('add', path => this.fileChanged(path));
      this.chokky.on('change', path => this.fileChanged(path));
      this.chokky.on('unlink', path => this.fileChanged(path));

      this.fileChanged(`${puzzleFolder(this.year, this.day)}/anything`);
    });
  }

  fileChanged(path: string) {
    let [year, day, file] = path.match(/^src\/(\d+)\/(\d+)\/(.+)/).slice(1);

    if (file.endsWith('txt')) {
      this.currentInput = file;
    }

    clearCache();

    try {
      solve(parseInt(year, 10), parseInt(day, 10), this.currentInput);
    } catch (error) {
      console.log(chalk.red(error.stack));
    }

    this.prompt();
  }

  refreshInputs() {
    let folder = puzzleFolder(this.year, this.day);
    let inputs: string[] = glob.sync(`${folder}/*.txt`);
    inputs.sort((a, b) => {
      if (a.endsWith('input.txt')) return -1;
      if (b.endsWith('input.txt')) return 1;
      return a.localeCompare(b);
    });
    this.inputs = inputs.map(x => x.replace(`${folder}/`, ''));
  }

  prompt() {
    this.refreshInputs();
    let output = this.inputs.map((name, idx) => {
      let selected = this.currentInput === name;
      let text = `[${idx + 1}] ${name}`;
      return selected ? chalk.bgGreen(text) : text;
    }).join(' ');
    output += chalk.red(' [q] exit') + '\n' + chalk.blue('> ');
    this.rl.question(output, answer => {
      this.handleInput(answer);
    });
  }

  handleInput(str: string) {
    let parsed = parseInt(str, 10);
    if (parsed) {
      let input = this.inputs[parsed - 1];
      this.fileChanged(`${puzzleFolder(this.year, this.day)}/${input}`);
    } else if (str === 'q' || str === 'Q') {
      process.exit(0);
    } else {
      console.log(chalk.red('Huh?'));
      this.prompt();
    }
  }
}

function main() {
  const argv = yargs
    .boolean('init')
    .boolean('watch')
    .parse();

  let year = parseInt(argv._[0], 10);
  let day = parseInt(argv._[1], 10);
  let input = argv.input || 'input.txt';

  if (!year || !day) {
    throw new UsageError('Usage: solve.ts <year> <day> [--watch] [--input file.txt]');
  }

  if (argv.init) {
    initPuzzle(year, day);
  }

  if (argv.watch) {
    const watcher = new Watcher(year, day, input);
  } else {
    solve(year, day, input);
  }
}

try {
  main();
} catch (error) {
  process.exitCode = 1;
  if (error instanceof UsageError) {
    console.error(chalk.red(error.message));
  } else {
    console.error(chalk.red(error.stack));
  }
}
