#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { checked, isSomeOf, isUndefined } from '../core/checks';
import { notNull } from '../core/flow/not-null';
import { INodemonOptions, isNodeJSSignal, Nodemon } from '../unsorted/nodemon';

async function main() {
  const argv = await yargs(hideBin(process.argv))
    .option('watch', {
      alias: `w`,
      type: 'array',
      string: true,
      description: 'Files/directories to watch',
      demandOption: true,
    })
    .option('exclude', {
      alias: `x`,
      type: 'array',
      string: true,
      description: 'Files/directories to ignore',
    })
    .option('delay', {
      alias: `d`,
      type: 'number',
      description: 'Delay in ms before restarting',
    })
    .option('exec', {
      alias: `e`,
      type: 'string',
      description: 'Execution string with inline args',
      demandOption: true,
    })
    .option('command', {
      alias: `c`,
      type: 'string',
      description: 'Execution command',
    })
    .option('arg', {
      alias: `a`,
      type: 'array',
      string: true,
      description: 'Execution arguments',
    })
    .option('files-check-interval', {
      alias: `i`,
      type: 'number',
      description: 'Interval in ms to check for file changes',
    })
    .option('dirs-check-interval', {
      alias: `I`,
      type: 'number',
      description: 'Interval in ms to check for directory changes',
    })
    .option('kill-signal', {
      alias: `k`,
      type: 'string',
      description: 'Kill signal to use (e.g. SIGTERM or a number)',
    })
    .option('spawn-options', {
      type: 'string',
      description: 'Spawn options as a JSON string',
    })
    .option('verbose', {
      alias: `v`,
      type: 'boolean',
      description: 'Enable verbose output',
    })
    .option('log-changed-files', {
      alias: `l`,
      type: 'boolean',
      description: 'Log changed files',
    })
    .option('log-tracked-files', {
      alias: `L`,
      type: 'boolean',
      description: 'Log tracked files',
    })
    .parse();

  const { exec, command, arg, ...restArgv } = argv;
  if (exec && !!(command || arg)) {
    throw new Error(`exec and command/args are mutually exclusive`);
  }
  if (arg && !command) {
    throw new Error(`args requires command`);
  }

  const options: INodemonOptions = {
    ...restArgv,
    exec: notNull(exec) || { command: notNull(command), args: arg },
    watch: argv.watch,
    ignore: argv.exclude,
    spawnOptions: argv.spawnOptions ? JSON.parse(argv.spawnOptions) : undefined,
    killSignal: checked(
      argv.killSignal,
      isSomeOf(isNodeJSSignal, isUndefined),
      () => `unknown kill-signal value`
    ),
  };

  const nodemon = new Nodemon(options);

  let shuttingDown = false;
  const shutdown = async () => {
    if (shuttingDown) {
      console.log('Forcefully shutting down...');
      process.exit(1);
    }
    shuttingDown = true;
    console.log('Gracefully shutting down... (press Ctrl+C again to force)');
    await nodemon.destroy();
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  await nodemon.start();

  // Keep the process alive until a shutdown signal is received
  await new Promise(() => {});
}

void main().catch(error => {
  console.error('An error occurred:', error);
  process.exit(1);
});
