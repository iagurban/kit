import { isTruthy } from '@gurban/kit/core/checks';
import { ExecutorContext } from '@nx/devkit';
import { spawn, SpawnOptions } from 'child_process';

import { mkDirP } from '../src/mkdir';
import { optionsSource } from '../src/options-source';
import { NodemonExecutorSchema } from './schema';

export default async function runExecutor(
  options: NodemonExecutorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  console.log(`[Poslah Nodemon] Executing for project "${context.projectName}"...`);

  const { get, getOrThrow } = optionsSource({ ...options });
  const cwd = get(`cwd`, () => '') || context.cwd;
  console.log('AAA', cwd);
  console.log(`[Poslah Nodemon] Ensuring CWD directory exists: ${cwd}`);
  let absoluteCwd: string;
  try {
    absoluteCwd = await mkDirP(context.root, cwd);
  } catch (e) {
    console.error(`[Poslah Nodemon] Failed to create CWD directory: ${cwd}`, e);
    return { success: false };
  }

  const nodemonArgs: string[] = [];

  options.config && nodemonArgs.push(`--config ${getOrThrow(`config`)}`);
  options.ext && nodemonArgs.push(`-e ${getOrThrow(`ext`).split(',').filter(isTruthy).join(',')}`);
  options.verbose && nodemonArgs.push('-V');
  options.watch &&
    options.watch.length > 0 &&
    options.watch.forEach((v, idx) => nodemonArgs.push(`-w "${getOrThrow(`watch.${idx}`)}"`));
  options.ignore &&
    options.ignore.length > 0 &&
    options.ignore.forEach((v, idx) => nodemonArgs.push(`-i "${getOrThrow(`ignore.${idx}`)}"`));

  options.exec && nodemonArgs.push(`-x "${getOrThrow(`exec`)}"`);

  // MODIFIED: Use the runner from options instead of 'npx'
  const command = get(`runner`, () => 'yarn');
  const commandArgs = ['nodemon', ...nodemonArgs];

  !options.exec && options.script && commandArgs.push(getOrThrow(`script`));

  options.scriptArgs &&
    options.scriptArgs.length > 0 &&
    options.scriptArgs.forEach((v, idx) => commandArgs.push(getOrThrow(`scriptArgs.${idx}`)));

  console.log(`[Poslah Nodemon] Running command: ${command} ${commandArgs.join(' ')}`);
  console.log(`[Poslah Nodemon] in directory: ${absoluteCwd}`);

  return new Promise((resolve, reject) => {
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
        console.error(`[Poslah Nodemon] Exited with code ${code}`);
        resolve({ success: false });
      }
    });

    child.on('error', err => {
      console.error('[Poslah Nodemon] Failed to start subprocess.', err);
      reject(err);
    });
  });
}
