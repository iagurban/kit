#!/usr/bin/env node
import * as dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
import * as fs from 'fs';
import * as path from 'path';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import { errorToString } from '../core/error-utils';

/**
 * Strips matching outer quotes from a string.
 * (e.g., '"value"' -> 'value')
 */
function stripOuterQuotes(s: string): string {
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

async function run() {
  // Parse CLI args via yargs
  const y = yargs(hideBin(process.argv))
    .scriptName('dotenv-flat')
    .usage(
      'Usage:\n' +
        '  $0 -e <file> [-e <file> ...] [-s KEY=VALUE ...] [-u KEY ...]\n' +
        '\n' +
        'Examples:\n' +
        '  $0 -e .env -e .env.local\n' +
        '  $0 -e .env -s APP_ENV=dev -s API_URL=https://example\n' +
        '  $0 -e .env -s EMPTY= -u REMOVE_ME\n' +
        '\n' +
        'Notes:\n' +
        '  - Files: pass with -e/--env (repeatable, preserves order).\n' +
        '  - Set: use -s/--set KEY=VALUE (repeatable). Empty values are valid.\n' +
        '  - Unset: use -u/--unset KEY (repeatable).\n' +
        '  - You may still pass positionals (files or KEY=VALUE), but -e/-s/-u are preferred.'
    )
    .option('env', {
      alias: ['e'],
      type: 'array',
      describe: 'Dotenv file(s) to load, in order (repeatable)',
      default: [],
    })
    .option('set', {
      alias: ['s', 'D', 'S'],
      type: 'array',
      describe: 'Override or define variables as KEY=VALUE (repeatable)',
      default: [],
    })
    .option('unset', {
      alias: ['u'],
      type: 'array',
      describe: 'Unset variable(s) by KEY (repeatable)',
      default: [],
    })
    .help('help')
    .alias('help', 'h')
    .version(false)
    .parserConfiguration({
      'populate--': false,
      'boolean-negation': false,
    });

  const argv = y.parseSync();

  const positionals = (argv._ || []).map(String);
  const envArgs = ((argv.env as Array<string | number | boolean> | undefined) || []).map(String);
  const setArgs = ((argv.set as Array<string | number | boolean> | undefined) || []).map(String);
  const unsetArgs = ((argv.unset as Array<string | number | boolean> | undefined) || []).map(String);

  const filePaths: string[] = [];
  const kvPairs: string[] = [];

  // Collect from flags first (preferred)
  for (const f of envArgs) {
    filePaths.push(f);
  }
  // Back-compat: also accept positionals as files or KEY=VALUE
  for (const item of positionals) {
    if (item.includes('=')) {
      kvPairs.push(item);
    } else {
      filePaths.push(item);
    }
  }
  for (const s of setArgs) {
    kvPairs.push(s);
  }

  if (filePaths.length === 0 && kvPairs.length === 0) {
    // Show help to aid the user, but write to stderr to keep stdout clean
    y.showHelp('error');
    console.error('Error: Provide at least one -e file or -s KEY=VALUE (or positionals).');
    process.exit(1);
  }

  const mergedConfig: dotenv.DotenvParseOutput = {};

  // 2. Read and merge all files in order
  for (const filePath of filePaths) {
    const fullPath = path.resolve(process.cwd(), filePath);

    if (!fs.existsSync(fullPath)) {
      console.error(`Error: File not found at ${fullPath}`);
      process.exit(1);
    }

    try {
      const fileContent = fs.readFileSync(fullPath);
      const parsedConfig = dotenv.parse(fileContent);

      // Merge keys, allowing later files to override earlier ones
      Object.assign(mergedConfig, parsedConfig);
    } catch (err) {
      console.error(`Error parsing file ${filePath}:`, errorToString(err));
      process.exit(1);
    }
  }

  // 2.5 Apply inline KEY=VALUE overrides (after files, in given order)
  for (const pair of kvPairs) {
    const idx = pair.indexOf('=');
    if (idx <= 0) {
      console.error(`Error: Invalid KEY=VALUE pair: ${pair}`);
      process.exit(1);
    }
    const key = pair.slice(0, idx).trim();
    const value = pair.slice(idx + 1); // may be an empty string and that's valid
    if (!key) {
      console.error(`Error: Invalid KEY=VALUE pair (empty key): ${pair}`);
      process.exit(1);
    }
    mergedConfig[key] = value;
  }

  // 2.6 Apply unsets (after sets), removing keys explicitly
  for (const k of unsetArgs) {
    const key = String(k).trim();
    if (!key || key.includes('=')) {
      console.error(`Error: Invalid key for --unset: ${k}`);
      process.exit(1);
    }
    delete mergedConfig[key];
  }

  // 3. "Flatten" the merged config by expanding ${...} variables
  const expandedResult = expand({ parsed: mergedConfig });

  if (expandedResult.error) {
    console.error('Error during variable expansion:', expandedResult.error);
    process.exit(1);
  }

  const finalConfig = expandedResult.parsed || {};

  // 4. Print the final, raw KEY=VALUE pairs to stdout
  for (const [key, value] of Object.entries(finalConfig)) {
    // Only output keys that were in our original merged set
    // (dotenv-expand can sometimes add extras from process.env)
    if (Object.prototype.hasOwnProperty.call(mergedConfig, key)) {
      // Ensure only the flat lines go to stdout
      process.stdout.write(`${key}=${stripOuterQuotes(String(value))}\n`);
    }
  }
}

run().catch(err => {
  console.error('Error:', err instanceof Error ? err.message : String(err));
  process.exit(1);
});
