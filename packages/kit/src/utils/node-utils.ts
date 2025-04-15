import { spawn as _spawn } from 'node:child_process';

type SpawnOptions = Record<`stdout` | `stderr`, `pipe` | `collect` | `mute` | ((data: unknown) => void)> & {
  cwd: string;
};
export const spawn = (command: string, args: readonly string[], options: Partial<SpawnOptions> = {}) =>
  new Promise<{ stdout?: unknown[]; stderr?: unknown[]; code?: string }>((resolve, reject) => {
    const s = _spawn(command, args, { cwd: options.cwd || process.cwd() });

    const collected: { stdout?: unknown[]; stderr?: unknown[] } = {};
    const handle = (
      data: unknown,
      consoleKey: `log` | `error`,
      collKey: `stdout` | `stderr`,
      mode: (typeof options)[`stdout`]
    ) => {
      switch (mode) {
        case `pipe`: {
          console[consoleKey](data?.toString());
          break;
        }
        case `mute`: {
          break;
        }
        case `collect`: {
          const c = collected[collKey];
          if (c) {
            c.push(data);
          } else {
            collected[collKey] = [data];
          }
          break;
        }
        default: {
          mode?.(data);
          break;
        }
      }
    };

    s.stdout.on('data', data => handle(data, `log`, `stdout`, options.stdout));
    s.stderr.on('data', data => handle(data, `error`, `stderr`, options.stderr));
    s.on('error', error => reject(error));
    s.on('exit', code => resolve({ ...collected, code: code?.toString() }));
  });

export const spawnInteractive = (
  command: string,
  args: readonly string[],
  options: Parameters<typeof _spawn>[2] = {}
) =>
  new Promise<{ stdout?: unknown[]; stderr?: unknown[]; code?: string }>((resolve, reject) => {
    const s = _spawn(command, args, { ...options, cwd: options.cwd || process.cwd() });
    s.on('error', error => reject(error));
    s.on('exit', code => resolve({ code: code?.toString() }));
  });

export const spawnStdout = (
  command: string,
  args: readonly string[],
  options: Partial<Omit<SpawnOptions, 'stdout' | 'stderr'>> = {}
) =>
  spawn(command, args, {
    stdout: `pipe`,
    stderr: `pipe`,
    ...options,
  });
