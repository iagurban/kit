import { isTruthy } from '@gurban/kit/core/checks';
import { ExecutorContext } from '@nx/devkit';
import { catchingAsync } from '@poslah/util/src/util';
import { spawn, SpawnOptions } from 'child_process';

import { mkDirP } from '../src/mkdir';
import { ExecutionError, optionsSource } from '../src/options-source';
import { RunExecutorSchema } from './schema';

/**
 * Executes a single command using spawn.
 * @returns A promise that resolves with the command's exit code.
 */
function executeCommand(
  cmd: string,
  args: string[] | undefined,
  spawnOptions: SpawnOptions
): Promise<number> {
  const commandString = [cmd, args?.join(' ')].filter(isTruthy).join(' ');
  console.log(`\n[Poslah Run] > ${commandString}`);

  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args ?? [], {
      ...spawnOptions,
      // Use shell:true to allow shell features like pipes, globbing, and environment variables.
      // This is especially useful for string-based commands.
      shell: true,
    });

    child.on('close', code => {
      resolve(code ?? 1);
    });

    child.on('error', err => {
      console.error(`[Poslah Run] Error executing command: ${commandString}`, err);
      reject(err);
    });
  });
}

export default async function runExecutor(
  options: RunExecutorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  console.log(`[Poslah Run] Executing commands for project "${context.projectName}"...`);

  try {
    const getOption = optionsSource({ ...options });

    const cwd = getOption.get(`cwd`, () => context.cwd);

    console.log(`[Poslah Run] Ensuring CWD directory exists: ${cwd}`);
    const absoluteCwd = await catchingAsync(
      () => mkDirP(context.root, cwd),
      (e): string => {
        throw new ExecutionError(`[Poslah Run] Failed to create CWD directory: ${cwd}`, e);
      }
    );

    const spawnOptions: SpawnOptions = {
      stdio: 'inherit',
      cwd: absoluteCwd,
    };

    for (const [commandIdx, command] of options.commands.entries()) {
      const commandPath = `commands.${commandIdx}`;
      try {
        const exitCode =
          typeof command === `string`
            ? await executeCommand(getOption.getOrThrow(commandPath), undefined, spawnOptions)
            : await executeCommand(
                getOption.getOrThrow(`${commandPath}.cmd`),
                command.args?.map((_, argIdx) => getOption.getOrThrow(`${commandPath}.args.${argIdx}`)),
                spawnOptions
              );
        if (exitCode !== 0) {
          console.log(`[Poslah Run] Command failed with exit code ${exitCode}.`);
          if (options.stopOnFail) {
            throw new ExecutionError('[Poslah Run] Stopping execution due to failure.', { exitCode });
          }
        }
      } catch (e) {
        throw new ExecutionError('[Poslah Run] A critical error occurred while trying to run a command.', e);
      }
    }

    console.log('\n[Poslah Run] All commands completed successfully.');
    return { success: true };
  } catch (e) {
    console.error.apply(e instanceof ExecutionError ? [e.name, e.cause] : [String(e)]);
    return { success: false };
  }
}
