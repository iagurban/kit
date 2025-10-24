#!/usr/bin/env node

import { createReadStream } from 'fs';
import fs from 'fs/promises';
import { glob } from 'glob';
import pLimit from 'p-limit';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// --- Type Definitions ---
interface CliArgs {
  destination: string;
  include: string[];
  exclude: string[];
  verbose: boolean;
  cwd: string; // Renamed from 'source'
  parallel: number;
  printAbsolutePaths: boolean;
  [key: string]: unknown;
}

interface CopyStats {
  copied: number;
  updated: number;
  skipped: number;
  total: number;
}

// --- Helper Functions ---

const createLogger = (isVerbose: boolean) => {
  return (message: string) => {
    if (isVerbose) {
      // Use process.stdout.write for cleaner logging in parallel operations
      process.stdout.write(`${message}\n`);
    }
  };
};

/**
 * Memory-efficiently compares two files using streams.
 * This version is fully type-safe and uses modern async iterators for simplicity and robustness.
 * 1. It checks file sizes for a fast path.
 * 2. If sizes are identical, it streams and compares the files chunk-by-chunk.
 * 3. It guarantees file streams are closed using a try...finally block.
 * @param srcPath The path to the source file.
 * @param destPath The path to the destination file.
 * @returns A promise that resolves to true if the files are identical, false otherwise.
 */
async function areFilesEqual(srcPath: string, destPath: string): Promise<boolean> {
  try {
    const [srcStat, destStat] = await Promise.all([fs.stat(srcPath), fs.stat(destPath)]);

    if (srcStat.size !== destStat.size) {
      return false;
    }
    if (srcStat.size === 0) {
      return true;
    }

    const srcStream = createReadStream(srcPath);
    const destStream = createReadStream(destPath);

    try {
      // Get async iterators for both streams
      const srcIterator = srcStream[Symbol.asyncIterator]();
      const destIterator = destStream[Symbol.asyncIterator]();

      while (true) {
        // Read the next chunk from both files concurrently
        const [srcResult, destResult] = await Promise.all([srcIterator.next(), destIterator.next()]);

        // If the source stream is done, the destination must also be done (since sizes are equal).
        // If both are done, all previous chunks are matched, so the files are equal.
        if (srcResult.done) {
          return destResult.done ?? false;
        }

        // The chunks are guaranteed to be Buffers because we did not specify an encoding.
        const srcChunk: Buffer = srcResult.value;
        const destChunk: Buffer = destResult.value;
        // Compare the buffer chunks. If they don't match, the files are different.
        if (!srcChunk.equals(destChunk)) {
          return false;
        }
      }
    } finally {
      srcStream.destroy();
      destStream.destroy();
    }
  } catch {
    // Catches errors like a file not found, treating them as "not equal".
    return false;
  }
}

const performCopy = async (argv: CliArgs) => {
  const log = createLogger(argv.verbose);
  const stats: CopyStats = { copied: 0, updated: 0, skipped: 0, total: 0 };

  // Use the new 'cwd' argument to resolve the source directory
  const sourceCwd = path.resolve(argv.cwd);
  const destinationRoot = path.resolve(argv.destination);

  const limit = pLimit(argv.parallel);

  log(`Working directory (CWD): ${sourceCwd}`);
  log(`Destination root:      ${destinationRoot}`);
  log(`Concurrency level:       ${argv.parallel}`);
  log('--------------------------------\n');

  const sourceFiles = await glob(argv.include, {
    cwd: sourceCwd, // <-- Use the correct CWD for glob
    ignore: argv.exclude,
    nodir: true,
    dot: true,
  });

  stats.total = sourceFiles.length;

  const processFile = async (relativeSrcPath: string) => {
    const absoluteSrcPath = path.join(sourceCwd, relativeSrcPath);
    const absoluteDestPath = path.join(destinationRoot, relativeSrcPath);
    const displayPath = argv.printAbsolutePaths ? absoluteSrcPath : relativeSrcPath;

    try {
      const destExists = await fs
        .access(absoluteDestPath)
        .then(() => true)
        .catch(() => false);

      if (!destExists) {
        log(`[COPYING] ${displayPath}`);
        await fs.mkdir(path.dirname(absoluteDestPath), { recursive: true });
        await fs.copyFile(absoluteSrcPath, absoluteDestPath);
        stats.copied++;
      } else {
        const areEqual = await areFilesEqual(absoluteSrcPath, absoluteDestPath);
        if (areEqual) {
          log(`[SKIPPING] ${displayPath} (identical)`);
          stats.skipped++;
        } else {
          log(`[UPDATING] ${displayPath} (changed)`);
          await fs.copyFile(absoluteSrcPath, absoluteDestPath);
          stats.updated++;
        }
      }
    } catch (error) {
      console.error(`\nError processing file: ${relativeSrcPath}`, error);
    }
  };

  const tasks = sourceFiles.map(relativeSrcPath => limit(() => processFile(relativeSrcPath)));

  await Promise.all(tasks);

  log('\n--- Sync Complete ---');
  log(`Total files matched: ${stats.total}`);
  log(`  Copied (new):      ${stats.copied}`);
  log(`  Updated (changed): ${stats.updated}`);
  log(`  Skipped (same):    ${stats.skipped}`);
  log('---------------------');
};

async function main() {
  // The yargs setup now uses the robust .command() structure.
  await yargs(hideBin(process.argv))
    .command(
      // COMMAND: '$0' is the script itself. '<destination>' declares the required positional argument.
      '$0 <destination>',

      // DESCRIPTION: A help string for the command.
      'Copies files based on glob patterns, skipping identical ones.',

      // BUILDER: This function configures all the options and arguments for the command.
      yargs => {
        return yargs
          .positional('destination', {
            describe: 'The destination directory',
            type: 'string',
            demandOption: true,
          })
          .option('include', {
            alias: 'i',
            type: 'string',
            array: true,
            description: 'Glob pattern(s) to include files. Can be repeated.',
            demandOption: true,
          })
          .nargs('include', 1)
          .option('exclude', {
            alias: ['x', 'X'],
            type: 'string',
            array: true,
            description: 'Glob pattern(s) to exclude. Can be repeated.',
            default: [],
          })
          .nargs('exclude', 1)
          .option('cwd', {
            alias: 'D',
            type: 'string',
            description: 'The working directory to search for files in.',
            default: process.cwd(),
          })
          .option('verbose', {
            alias: 'v',
            type: 'boolean',
            description: 'Run with verbose logging.',
            default: false,
          })
          .option('parallel', {
            alias: 'p',
            type: 'number',
            description: 'Number of parallel file operations to run.',
            default: 1,
            coerce: (arg: number) => Math.max(1, arg),
          })
          .option('print-absolute-paths', {
            alias: 'A',
            type: 'boolean',
            description: 'Print absolute file paths in verbose output. Requires -v.',
            default: false,
          });
      },

      // HANDLER: This function receives the parsed arguments and executes the logic.
      // It now simply calls your refactored performCopy function.
      async argv => {
        // The argv object is guaranteed by yargs to be compatible with your configuration.
        // We can safely cast it to your CliArgs type before passing it on.
        await performCopy(argv);
      }
    )
    .help()
    .alias('h', 'help')
    .strict() // .strict() now works perfectly because all arguments are formally defined.
    .parse(); // This triggers the parsing and executes the handler.
}

main().catch(err => {
  console.error('\nAn unexpected error occurred:');
  console.error(err);
  process.exit(1);
});
