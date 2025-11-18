import fs from 'fs';
import http from 'http';
import { Client as NTPClient } from 'ntp-time';
import path from 'path';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

import { checked, isROArray, isString } from '../core/checks';
import { JsonObject } from '../core/json/json-type';

/**
 * Parses an array of JSON strings and merges them into a single object.
 * @param extras - An array of strings, e.g., ['{"schema":"1.0"}', '{"env":"prod"}'].
 * @returns An object with the merged key-value pairs.
 */
function parseExtraFields(extras: string[] = []): JsonObject {
  let extraFields: JsonObject = {};
  for (const extra of extras) {
    try {
      const parsed = JSON.parse(extra);
      if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
        extraFields = { ...extraFields, ...parsed };
      } else {
        throw new Error(`Expected a JSON object.`);
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      throw new Error(`[!] Malformed extra field: "${extra}". Failed to parse JSON: ${message}`);
    }
  }
  return extraFields;
}

const simpleFetch = (url: string) =>
  new Promise<string>((resolve, reject) => {
    http
      .get(url, res => {
        let data = '';
        res.on('data', chunk => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
      })
      .on('error', err => {
        reject(err);
      });
  });

const sources = {
  local: async () => new Date(),
  worldclockapi: async () => {
    const currentDateTime = checked(
      JSON.parse(await simpleFetch('http://worldclockapi.com/api/json/utc/now')),
      isString,
      () => `currentDateTime is not a string`
    );
    if (currentDateTime) {
      const date = new Date(currentDateTime);
      if (Number.isNaN(+date)) {
        throw new Error(`date ${date} is invalid`);
      }
      return date;
    } else {
      throw new Error('Failed to get remote time: invalid response');
    }
  },
  ntp: async () => (await new NTPClient('time.google.com', 123, { timeout: 5000 }).syncTime()).time,
} as const satisfies Record<string, () => Promise<Date>>;

const types = {
  stamp: (d: Date) => +d,
  iso: (d: Date) => d.toISOString(),
} as const satisfies Record<string, (d: Date) => unknown>;

async function main() {
  const argv = await yargs(hideBin(process.argv))
    .scriptName('build-info-gen.ts')
    .usage('Usage: $0 [options] [output...]')
    .command('$0 [output...]', 'Generate build info file', yargs =>
      yargs.positional('output', {
        describe: 'Path to the output JSON file(s) (outputs to stdout if not defined).',
        type: 'string',
      })
    )
    .parserConfiguration({ 'greedy-arrays': false })
    .option('source', {
      alias: 's',
      describe: 'The source for the timestamp',
      type: 'string',
      choices: Object.keys(sources) as (keyof typeof sources)[],
      default: 'local' as keyof typeof sources,
    })
    .option('extra', {
      alias: 'x',
      describe: `Extra JSON objects to merge into the build info (e.g., '{"foo":"bar"}')`,
      type: 'string',
      array: true,
    })
    .option('key', {
      alias: 'k',
      describe: 'The JSON-key for the timestamp',
      type: 'string',
      default: 'buildTime',
    })
    .option('type', {
      alias: 't',
      describe: 'Time record kind',
      type: 'string',
      choices: Object.keys(types) as (keyof typeof types)[],
      default: 'stamp' as keyof typeof types,
    })
    .option('pretty', {
      alias: 'p',
      describe: 'Is pretty-printed',
      type: 'boolean',
      default: false,
    })
    .option('verbose', {
      alias: 'v',
      describe: 'Print a log',
      type: 'boolean',
      default: false,
    })

    .help()
    .alias('h', 'help')
    .strict()
    .parse();

  const buildInfo: JsonObject = {
    ...parseExtraFields(argv.extra),
    [argv.key]: types[argv.type](await sources[argv.source]()),
  };

  const stringified = argv.pretty ? JSON.stringify(buildInfo, null, 2) : JSON.stringify(buildInfo);

  const outputs = argv.output
    ? checked(argv.output, isROArray, () => `argv.output is not an array`).map((s, i) =>
        checked(s, isString, () => `argv.output[${i}] is not a string`)
      )
    : null;

  if (outputs?.length) {
    for (const output of outputs) {
      const outputDir = path.dirname(output);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      try {
        fs.accessSync(outputDir, fs.constants.W_OK);
      } catch {
        throw new Error(`Output directory "${outputDir}" is not writable`);
      }
    }

    for (const output of outputs) {
      // 4. Write the final JSON file
      fs.writeFileSync(output, stringified, 'utf-8');
      argv.verbose && console.log(`✅ Build info successfully written to: ${path.resolve(output)}`);
    }
  } else {
    console.log(stringified);
  }
}

void main().catch(error => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
