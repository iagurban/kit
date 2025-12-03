import { spawn } from 'node:child_process';
import { EventEmitter } from 'node:events';

import { ChildProcess, SpawnOptions } from 'child_process';
import * as fs from 'fs';
import { glob } from 'glob';
import path from 'path';

import { errorToString, isTruthy, ReadonlyExtendedJsonObject, sleep } from '../core';

type LogFunction = (
  channel: `error` | `warn` | `log`,
  message: string,
  payload?: ReadonlyExtendedJsonObject
) => void;

export class MtimeTracker extends EventEmitter<{
  changed: [readonly string[]];
  added: [string];
  removed: [string];
}> {
  private mtimes = new Map<string, Date | null>();

  constructor(
    private readonly checkInterval: number,
    private readonly log: LogFunction
  ) {
    super();
  }

  private running?: {
    promise: Promise<unknown>;
    cancel(): void;
  };

  lastPoll: Promise<unknown> = Promise.resolve();

  private async poll(paths: string[]) {
    return await Promise.all(
      paths.map(async p => {
        try {
          return [p, (await fs.promises.stat(p)).mtime] as const;
        } catch (error) {
          this.log(`error`, `Cannot stat path ${p}`, {
            error: errorToString(error),
          });
          return [p, null] as const;
        }
      })
    );
  }

  protected async checkForChanges() {
    return (this.lastPoll = this.lastPoll.then(async () => {
      const info = await this.poll([...this.mtimes.keys()]);
      const changed: string[] = [];
      for (const [p, mtime] of info) {
        if (mtime) {
          const old = this.mtimes.get(p);
          if (!old || old.getTime() < mtime.getTime()) {
            this.mtimes.set(p, mtime);
            changed.push(p);
          }
        } else {
          this.mtimes.delete(p);
          changed.push(p);
        }
      }

      if (changed.length > 0) {
        this.emit(`changed`, changed);
      }
    }));
  }

  public add(path: string) {
    if (!this.mtimes.has(path)) {
      this.mtimes.set(path, null);
      this.emit(`added`, path);
    }
  }

  public remove(path: string) {
    if (this.mtimes.has(path)) {
      this.mtimes.delete(path);
      this.emit(`removed`, path);
    }
  }

  get started() {
    return !!this.running;
  }

  public start(): void {
    if (this.running) {
      return;
    }

    const controller = {
      canceled: false,
    };

    this.running = {
      promise: (async () => {
        while (!controller.canceled) {
          await this.checkForChanges();
          await sleep(this.checkInterval);
        }
      })(),
      cancel: () => {
        controller.canceled = true;
      },
    };
  }

  public async stop() {
    if (this.running) {
      this.running.cancel();
      await this.running.promise;
      this.running = undefined;
    }
  }
}

export class NodemonFileWatcher {
  readonly foldersTracker: MtimeTracker;
  readonly filesTracker: MtimeTracker;

  constructor(
    private onChanges: (changed: readonly string[]) => void,
    private readonly watchPatterns: string[],
    private readonly ignorePatterns: string[],
    private readonly allowedExtensions: Set<string> | null,
    filesCheckInterval: number,
    dirsCheckInterval: number,
    private readonly reGlobbingInterval: number,
    private readonly verbose: boolean,
    private readonly logChangedFiles: boolean,
    private readonly logTrackedFiles: boolean,
    private readonly cwd: string | null,
    private readonly log: LogFunction
  ) {
    this.foldersTracker = new MtimeTracker(dirsCheckInterval, log);
    this.filesTracker = new MtimeTracker(filesCheckInterval, log);
  }

  private onFoldersChanged = () => {
    if (this.verbose) {
      this.log(`log`, 'Folders changes detected, re-globbing...');
    }
    void this.performScan();
  };

  private onFilesChanged = (paths: readonly string[]) => {
    if (this.verbose) {
      this.log(`log`, 'Files changes detected, restarting...');
      if (this.logChangedFiles) {
        this.log(`log`, '  Changed files:', { paths });
      }
    }
    this.onChanges(paths);
  };

  private data: { watchedFiles: Set<string>; watchedDirs: Set<string> } = {
    watchedDirs: new Set(),
    watchedFiles: new Set(),
  };

  private scanning: Promise<void> = Promise.resolve();

  private async performScan() {
    return (this.scanning = this.scanning.then(async () => {
      const oldData = this.data;

      let files = await glob(this.watchPatterns, {
        ignore: this.ignorePatterns,
        nodir: true,
        absolute: true,
        cwd: this.cwd ?? undefined,
      });

      const { allowedExtensions } = this;
      if (allowedExtensions) {
        files = files.filter(f => allowedExtensions.has(path.extname(f)));
      }

      const watchedFiles = new Set(files);
      const watchedDirs = new Set(files.map(f => path.dirname(f)));

      for (const d of watchedDirs) {
        if (!oldData.watchedDirs.has(d)) {
          this.foldersTracker.add(d);
        }
      }

      for (const f of watchedFiles) {
        if (!oldData.watchedFiles.has(f)) {
          this.filesTracker.add(f);
        }
      }

      for (const d of oldData.watchedDirs) {
        if (!watchedDirs.has(d)) {
          this.foldersTracker.remove(d);
        }
      }

      for (const f of oldData.watchedFiles) {
        if (!watchedFiles.has(f)) {
          this.filesTracker.remove(f);
        }
      }

      this.data = { watchedDirs, watchedFiles };

      if (this.logTrackedFiles) {
        this.log(`log`, 'Tracked directories:', { dirs: Array.from(this.data.watchedDirs) });
        this.log(`log`, 'Tracked files:', { files: Array.from(this.data.watchedFiles) });
      }
    }));
  }

  private reGlobbingCycle?: { promise: Promise<void>; cancel: () => void };

  public async start() {
    if (this.reGlobbingCycle) {
      return;
    }

    const controller = { canceled: false };
    this.reGlobbingCycle = {
      promise: (async () => {
        while (!controller.canceled) {
          await this.performScan();
          await sleep(this.reGlobbingInterval);
        }
      })(),
      cancel: () => {
        controller.canceled = true;
      },
    };

    this.foldersTracker.on(`changed`, this.onFoldersChanged);
    this.filesTracker.on(`changed`, this.onFilesChanged);

    this.foldersTracker.start();
    this.filesTracker.start();

    await this.performScan();
  }

  public async stop() {
    if (!this.reGlobbingCycle) {
      return;
    }

    this.reGlobbingCycle.cancel();
    this.reGlobbingCycle = undefined;

    this.foldersTracker.off(`changed`, this.onFoldersChanged);
    this.filesTracker.off(`changed`, this.onFilesChanged);

    await this.foldersTracker.stop();
    await this.filesTracker.stop();
  }
}

export class ManagedProcess extends EventEmitter<{
  started: [];
  killed: [number | null];
  error: [unknown];
}> {
  private running: {
    process: ChildProcess;
    finished: Promise<number | null>;
    killing?: Promise<unknown>;
  } | null = null;

  private readonly command: string;
  private readonly args: string[];
  private readonly killSignal: NodeJS.Signals | number;
  private readonly spawnOptions: SpawnOptions;

  constructor(
    exec: { command: string; args?: string[] },
    killSignal: NodeJS.Signals | number,
    spawnOptions: SpawnOptions,
    private readonly log: LogFunction
  ) {
    super();

    this.command = exec.command.trim();
    this.args = exec.args || [];
    this.killSignal = killSignal;
    this.spawnOptions = spawnOptions;
  }

  private killProcessGroup(proc: ChildProcess, signal: NodeJS.Signals | number) {
    if (!proc.pid) {
      this.log(
        `warn`,
        `Attempted to kill a process with no PID. The process may have already exited or failed to spawn.`
      );
      return;
    }

    try {
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', proc.pid.toString(), '/f', '/t']);
      } else {
        process.kill(-proc.pid, signal);
      }
    } catch (error) {
      this.log(`warn`, `Failed to kill process group ${proc.pid}. It may have already exited.`, {
        error: errorToString(error),
      });
    }
  }

  public start(): void {
    if (this.running) {
      return;
    }

    const process = spawn(this.command, this.args, {
      stdio: 'inherit',
      shell: true,
      ...this.spawnOptions,
      detached: true,
    });
    const startedAt = new Date();
    this.running = {
      process,
      finished: new Promise<number | null>((resolve, reject) => {
        process.once('close', code => {
          this.log(
            `log`,
            `Child process exited with code ${code} after ${formatDuration(
              new Date().getTime() - startedAt.getTime()
            )}`
          );
          resolve(code);
        });

        process.once('error', error => {
          this.log(`error`, 'Failed to start child process.', {
            error: errorToString(error),
          });
          reject(error);
        });
      })
        .catch(error => {
          this.emit(`error`, error);
          return null;
        })
        .finally(() => {
          if (this.running?.process === process) {
            this.running = null;
          }
        }),
    };
    this.emit(`started`);
  }

  public async kill(): Promise<unknown> {
    const { running } = this;
    if (!running) {
      return;
    }
    if (running.killing) {
      return running.killing;
    }

    this.killProcessGroup(running.process, this.killSignal);

    return (running.killing = Promise.race([
      // Option A: The process exits cleanly
      (async () => {
        const code = await running.finished;
        this.emit(`killed`, code);
      })(),

      // Option B: The process hangs, so we force-kill it after a delay
      (async () => {
        await sleep(5000); // 5-second timeout

        // If we reach this point, it means running.finished hasn't resolved yet
        if (this.running === running) {
          // Check if it hasn't been replaced
          this.log(`warn`, 'Process did not shut down gracefully. Forcing kill with SIGKILL.');
          this.killProcessGroup(running.process, 'SIGKILL'); // The unstoppable signal
          await running.finished;
        }
      })(),
    ]));
  }
}

export interface INodemonOptions {
  watch: string[];
  ignore?: string[];
  extensions?: string[] | null;
  delay?: number; // in ms
  exec: string | { command: string; args?: string[] };
  filesCheckInterval?: number; // in ms
  dirsCheckInterval?: number; // in ms
  reGlobbingInterval?: number; // in ms
  killSignal?: NodeJS.Signals | number;
  spawnOptions?: SpawnOptions;
  verbose?: boolean;
  logChangedFiles?: boolean;
  logTrackedFiles?: boolean;
  cwd?: string | null;
  log?: LogFunction;
}

export class Nodemon extends EventEmitter<{
  'dirs-changed': [readonly string[]];
  'dir-added': [string];
  'dir-removed': [string];
  'files-changed': [readonly string[]];
  'file-added': [string];
  'file-removed': [string];
  'process-started': [];
  'process-killed': [number | null];
  'process-error': [unknown];
}> {
  private readonly watcher: NodemonFileWatcher;
  private readonly options: Required<INodemonOptions>;
  private restartTimeout: NodeJS.Timeout | null = null;
  private isRunning = false;
  private readonly process: ManagedProcess;

  constructor(options: INodemonOptions) {
    super();

    if (typeof options.exec === `string` && options.spawnOptions?.shell === false) {
      throw new Error(`using exec-options with shell=false is not supported`);
    }

    const filesCheckInterval = options.filesCheckInterval ?? 500;
    this.options = {
      ignore: [],
      delay: 1000,
      ...options,
      filesCheckInterval,
      dirsCheckInterval: options.dirsCheckInterval ?? filesCheckInterval * 4,
      reGlobbingInterval: options.reGlobbingInterval ?? filesCheckInterval * 10,
      killSignal: options.killSignal ?? 'SIGTERM',
      spawnOptions: options.spawnOptions ?? {},
      verbose: options.verbose ?? false,
      logChangedFiles: options.logChangedFiles ?? false,
      logTrackedFiles: options.logTrackedFiles ?? false,
      extensions: options.extensions ?? null,
      cwd: options.cwd ?? null,
      log:
        options.log ??
        ((mode, message, payload) => {
          if (payload) {
            console[mode](message, payload);
          } else {
            console[mode](message);
          }
        }),
    };

    if (this.options.verbose) {
      const { log: _log, spawnOptions, ...o } = this.options;
      this.options.log(`log`, 'Nodemon configured with:', {
        ...o,
        spawnOptions: JSON.stringify(spawnOptions),
      });
    }

    this.watcher = new NodemonFileWatcher(
      () => {
        this.scheduleRestart();
      },
      this.options.watch,
      this.options.ignore,
      this.options.extensions && new Set(this.options.extensions.filter(isTruthy).map(e => `.${e}`)),
      this.options.filesCheckInterval,
      this.options.dirsCheckInterval,
      this.options.reGlobbingInterval,
      this.options.verbose,
      this.options.logChangedFiles,
      this.options.logTrackedFiles,
      this.options.cwd,
      this.options.log
    );

    const [exec, spawnOptions] =
      typeof this.options.exec === `string`
        ? ([{ command: this.options.exec }, { ...this.options.spawnOptions, shell: true }] as const)
        : ([this.options.exec, this.options.spawnOptions] as const);

    this.process = new ManagedProcess(exec, this.options.killSignal, spawnOptions, this.options.log);

    this.setForwarding(`on`);
  }

  private destroyed = false;

  readonly eventsPassthrough = {
    files: {
      changed: (data: readonly string[]) => this.emit(`files-changed`, data),
      added: (data: string) => this.emit(`file-added`, data),
      removed: (data: string) => this.emit(`file-removed`, data),
    },
    dirs: {
      changed: (data: readonly string[]) => this.emit(`dirs-changed`, data),
      added: (data: string) => this.emit(`dir-added`, data),
      removed: (data: string) => this.emit(`dir-removed`, data),
    },
    process: {
      started: () => this.emit('process-started'),
      killed: (code: number | null) => this.emit('process-killed', code),
      error: (error: unknown) => this.emit('process-error', error),
    },
  } as const;

  private setForwarding(mode: `on` | `off`) {
    this.watcher.filesTracker[mode](`changed`, this.eventsPassthrough.files.changed);
    this.watcher.filesTracker[mode](`added`, this.eventsPassthrough.files.added);
    this.watcher.filesTracker[mode](`removed`, this.eventsPassthrough.files.removed);
    this.watcher.foldersTracker[mode](`changed`, this.eventsPassthrough.dirs.changed);
    this.watcher.foldersTracker[mode](`added`, this.eventsPassthrough.dirs.added);
    this.watcher.foldersTracker[mode](`removed`, this.eventsPassthrough.dirs.removed);
    this.process[mode]('started', this.eventsPassthrough.process.started);
    this.process[mode]('killed', this.eventsPassthrough.process.killed);
    this.process[mode]('error', this.eventsPassthrough.process.error);
  }

  public async start(): Promise<void> {
    if (this.destroyed) {
      throw new Error(`start called after destroy`);
    }
    if (this.isRunning) {
      return;
    }
    this.options.log(`log`, 'Starting nodemon...');
    await this.watcher.start();
    // this.process.start();

    this.isRunning = true;
  }

  public async stop(): Promise<void> {
    if (!this.isRunning) {
      return;
    }
    this.options.log(`log`, 'Stopping nodemon...');
    if (this.restartTimeout) {
      clearTimeout(this.restartTimeout);
      this.restartTimeout = null;
    }
    await Promise.all([this.watcher.stop(), this.process.kill()]);
    this.isRunning = false;
  }

  private scheduleRestart(): void {
    if (this.restartTimeout) {
      clearTimeout(this.restartTimeout);
    }
    if (this.destroyed) {
      return;
    }
    this.restartTimeout = setTimeout(() => {
      void this.restart();
    }, this.options.delay);
  }

  private async restart(): Promise<void> {
    this.options.log(`log`, 'Restarting process...');
    await this.process.kill();
    if (this.destroyed) {
      return;
    }
    this.process.start();
  }

  public async destroy() {
    await this.stop();
    if (this.destroyed) {
      return;
    }
    this.destroyed = true;

    this.setForwarding(`off`);
  }
}

export const formatDuration = (durationInMs: number): string => {
  const seconds = Math.floor(durationInMs / 1000);
  const milliseconds = durationInMs % 1000;
  return `${seconds}.${String(milliseconds).padStart(3, '0')}s`;
};
