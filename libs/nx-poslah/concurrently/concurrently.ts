import { ExecutorContext } from '@nx/devkit';
import { spawn, SpawnOptions } from 'child_process';
import { mkdir } from 'fs/promises';
import { resolve } from 'path';

import { ConcurrentlyExecutorSchema } from './schema';

/**
 * Takes the executor options and explicitly converts them into an array of arguments
 * for the concurrently CLI.
 */
function buildConcurrentlyArgs(options: ConcurrentlyExecutorSchema): { commands: string[]; args: string[] } {
  const {
    processes,
    maxProcesses,
    success,
    raw,
    noColor,
    group,
    timings,
    passthroughArguments,
    teardown,
    prefix,
    prefixLength,
    timestampFormat,
    padPrefix,
    handleInput,
    defaultInputTarget,
    killOthers,
    killOthersOnFail,
    killSignal,
    killTimeout,
    restartTries,
    restartAfter,
  } = options;

  // 1. Process the `processes` array to build command-specific arguments
  const commands: string[] = [];
  const names: string[] = [];
  const rawColors: (string | undefined)[] = [];
  const hidden: string[] = [];

  processes.forEach((p, index) => {
    commands.push(p.command);
    const name = p.name ?? `__${index}`;
    names.push(name);
    rawColors.push(p.color);
    if (p.hide) {
      hidden.push(name);
    }
  });

  // Smartly process colors: fill gaps with 'reset' and trim trailing undefineds
  let lastColorIndex = -1;
  for (let i = rawColors.length - 1; i >= 0; i--) {
    if (rawColors[i]) {
      lastColorIndex = i;
      break;
    }
  }
  const finalColors =
    lastColorIndex > -1 ? rawColors.slice(0, lastColorIndex + 1).map(c => c ?? 'reset') : [];

  // 2. Build the main arguments list by explicitly processing each option
  const concurrentlyArgs: string[] = [];

  // Add arguments derived from the processes array
  concurrentlyArgs.push('--names', names.join(','));
  finalColors.length > 0 && concurrentlyArgs.push('--prefix-colors', finalColors.join(','));
  hidden.length > 0 && concurrentlyArgs.push('--hide', hidden.join(','));

  // Explicitly handle each option
  maxProcesses && concurrentlyArgs.push('--max-processes', String(maxProcesses));
  success && concurrentlyArgs.push('--success', success);
  raw && concurrentlyArgs.push('--raw');
  noColor && concurrentlyArgs.push('--no-color');
  group && concurrentlyArgs.push('--group');
  timings && concurrentlyArgs.push('--timings');
  passthroughArguments && concurrentlyArgs.push('--passthrough-arguments');
  teardown && teardown.forEach(cmd => concurrentlyArgs.push('--teardown', cmd));
  prefix && concurrentlyArgs.push('--prefix', prefix);
  prefixLength && concurrentlyArgs.push('--prefix-length', String(prefixLength));
  timestampFormat && concurrentlyArgs.push('--timestamp-format', timestampFormat);
  padPrefix && concurrentlyArgs.push('--pad-prefix');
  handleInput && concurrentlyArgs.push('--handle-input');
  defaultInputTarget && concurrentlyArgs.push('--default-input-target', defaultInputTarget);
  killOthers && concurrentlyArgs.push('--kill-others');
  killOthersOnFail && concurrentlyArgs.push('--kill-others-on-fail');
  killSignal && concurrentlyArgs.push('--kill-signal', killSignal);
  killTimeout && concurrentlyArgs.push('--kill-timeout', String(killTimeout));
  // Handle numeric '0' as a valid value
  restartTries !== undefined &&
    restartTries !== null &&
    concurrentlyArgs.push('--restart-tries', String(restartTries));
  restartAfter !== undefined &&
    restartAfter !== null &&
    concurrentlyArgs.push('--restart-after', String(restartAfter));

  return { commands, args: concurrentlyArgs };
}

export default async function runExecutor(
  options: ConcurrentlyExecutorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  console.log(`[Poslah Concurrently] Executing for project "${context.projectName}"...`);

  const { cwd, runner } = options;

  let absoluteCwd: string | undefined = undefined;
  if (cwd) {
    absoluteCwd = resolve(context.root, cwd);
    console.log(`[Poslah Concurrently] Ensuring directory exists: ${absoluteCwd}`);
    try {
      await mkdir(absoluteCwd, { recursive: true });
    } catch (e) {
      console.error(`[Poslah Concurrently] Failed to create directory: ${absoluteCwd}`, e);
      return { success: false };
    }
  }

  const { commands, args } = buildConcurrentlyArgs(options);

  // Quote commands to handle spaces, arguments, etc.
  const quotedCommands = commands.map(c => `"${c.replace(/"/g, '\\"')}"`);

  const command = runner ?? 'yarn';
  const commandArgs = ['concurrently', ...args, ...quotedCommands];

  console.log(`[Poslah Concurrently] Running command: ${command} ${commandArgs.join(' ')}`);
  if (absoluteCwd) {
    console.log(`[Poslah Concurrently] in directory: ${absoluteCwd}`);
  }

  return new Promise(resolve => {
    const spawnOptions: SpawnOptions = {
      stdio: 'inherit',
      shell: true,
      cwd: absoluteCwd,
    };

    const child = spawn(command, commandArgs, spawnOptions);

    child.on('close', code => {
      if (code === 0) {
        resolve({ success: true });
      } else {
        console.error(`[Poslah Concurrently] Exited with code ${code}`);
        resolve({ success: false });
      }
    });

    child.on('error', err => {
      console.error('[Poslah Concurrently] Failed to start subprocess.', err);
      // Rejecting the promise is not idiomatic for Nx executors, resolve with failure instead.
      resolve({ success: false });
    });
  });
}
