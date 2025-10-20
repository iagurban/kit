import { checked, isInteger, isTruthy } from '@gurban/kit/core/checks';
import { ExtendedJsonObject } from '@gurban/kit/core/json-type';
import { INodemonOptions, isNodeJSSignal, Nodemon } from '@gurban/kit/nodemon';
import { ExecutorContext } from '@nx/devkit';

import { mkDirP } from '../src/mkdir';
import { optionsSource } from '../src/options-source';
import { NodemonExecutorSchema } from './schema';

export default async function runExecutor(
  options: NodemonExecutorSchema & Record<string, unknown>,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  console.log(`[Nodemon] Executing for project "${context.projectName}"...`);

  const { get, getOrThrow } = optionsSource(options as ExtendedJsonObject);

  const cwd = (options.cwd && getOrThrow('cwd')) || context.cwd;
  console.log(`[Nodemon] Ensuring CWD directory exists: ${cwd}`);
  let absoluteCwd: string;
  try {
    absoluteCwd = await mkDirP(context.root, cwd);
  } catch (e) {
    console.error(`[Nodemon] Failed to create CWD directory: ${cwd}`, e);
    return { success: false };
  }

  const commandArgs = options.exec
    ? [getOrThrow('exec')]
    : [
        getOrThrow('script'),
        ...(options.scriptArgs?.map((v, i) => getOrThrow(`scriptArgs.${i}`)) ?? []),
      ].filter(isTruthy);

  const execConfig: INodemonOptions['exec'] = {
    command: getOrThrow('runner'),
    args: commandArgs,
  };

  const optional = <T>(path: string, check: (path: string) => T) => {
    const rawValue = options[path];
    if (rawValue === undefined) {
      return undefined;
    }
    return check(path);
  };

  const getNumber = (path: string) => {
    const rawValue = options[path];
    if (typeof rawValue === `number`) {
      return rawValue;
    }
    if (typeof rawValue === `string`) {
      return checked(Number(getOrThrow(path)), isInteger, () => `Invalid number for ${path}`);
    }
    throw new Error(`Invalid value for ${path}`);
  };

  const getSignal = (path: string) => {
    const rawValue = options[path];
    return checked(
      typeof rawValue === `string` ? getOrThrow(path) : rawValue,
      isNodeJSSignal,
      () => `Invalid signal value for ${path}`
    );
  };

  const getBoolean = (path: string) => {
    const rawValue = options[path];
    if (typeof rawValue === `boolean`) {
      return rawValue;
    }
    if (typeof rawValue === `string`) {
      const value = getOrThrow(path);
      if (value === `true`) {
        return true;
      }
      if (value === `false`) {
        return false;
      }
    }
    throw new Error(`Invalid value for ${path}`);
  };

  const nodemonOptions: INodemonOptions = {
    exec: execConfig,
    watch: options.watch.map((v, i) => getOrThrow(`watch.${i}`)),
    ignore: options.ignore?.map((v, i) => getOrThrow(`ignore.${i}`)) ?? [],
    extensions: options.ext ? getOrThrow('ext').split(',').filter(isTruthy) : null,
    delay: optional('delay', getNumber),
    verbose: optional('verbose', getBoolean),
    killSignal: optional('signal', getSignal),
    logChangedFiles: optional('logChangedFiles', getBoolean),
    logTrackedFiles: optional('logTrackedFiles', getBoolean),
    filesCheckInterval: optional('filesCheckInterval', getNumber),
    dirsCheckInterval: optional('dirsCheckInterval', getNumber),
    cwd: absoluteCwd,
    spawnOptions: {
      ...options.spawnOptions,
      cwd: absoluteCwd,
    },
    log: (channel, message, payload) =>
      payload ? console[channel](`[Nodemon] ${message}`, payload) : console[channel](`[Nodemon] ${message}`),
  };

  const nodemon = new Nodemon(nodemonOptions);

  return new Promise(resolve => {
    let shuttingDown = false;
    const shutdown = async () => {
      if (shuttingDown) {
        return;
      }
      shuttingDown = true;
      console.log('\n[Nodemon] Shutting down gracefully...');
      await nodemon.destroy();
      resolve({ success: true });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

    nodemon.start().catch(err => {
      console.error('[Nodemon] Failed to start.', err);
      resolve({ success: false });
    });
  });
}
