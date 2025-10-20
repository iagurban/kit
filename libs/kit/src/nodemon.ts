import { EventEmitter } from 'node:events';

import { ChildProcess, spawn, SpawnOptions } from 'child_process';
import * as fs from 'fs';
import { glob } from 'glob';
import path from 'path';

import { sleep } from './utils/async-utils';

export class MtimeTracker extends EventEmitter<{
  changed: [readonly string[]];
  added: [string];
  removed: [string];
}> {
  private mtimes = new Map<string, Date | null>();

  constructor(private readonly checkInterval = 500) {
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
        } catch (e) {
          console.error(`Cannot stat path ${p}`, e);
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
    filesCheckInterval: number,
    dirsCheckInterval: number,
    private readonly verbose: boolean,
    private readonly logChangedFiles: boolean,
    private readonly logTrackedFiles: boolean
  ) {
    this.foldersTracker = new MtimeTracker(dirsCheckInterval);
    this.filesTracker = new MtimeTracker(filesCheckInterval);
  }

  private onFoldersChanged = () => {
    if (this.verbose) {
      console.log('Folders changes detected, re-globbing...');
    }
    void this.performScan();
  };

  private onFilesChanged = (paths: readonly string[]) => {
    if (this.verbose) {
      console.log('Files changes detected, restarting...');
      if (this.logChangedFiles) {
        console.log('  Changed files:', paths);
      }
    }
    this.onChanges(paths);
  };

  private data: { watchedFiles: Set<string>; watchedDirs: Set<string> } = {
    watchedDirs: new Set(),
    watchedFiles: new Set(),
  };

  private async performScan() {
    const oldData = this.data;

    const files = await glob(this.watchPatterns, {
      ignore: this.ignorePatterns,
      nodir: true,
      absolute: true,
    });
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
      console.log('Tracked directories:', Array.from(this.data.watchedDirs));
      console.log('Tracked files:', Array.from(this.data.watchedFiles));
    }
  }

  public start(): void {
    if (this.filesTracker.started) {
      return;
    }

    this.foldersTracker.on(`changed`, this.onFoldersChanged);
    this.filesTracker.on(`changed`, this.onFilesChanged);

    this.foldersTracker.start();
    this.filesTracker.start();
  }

  public async stop() {
    if (!this.filesTracker.started) {
      return;
    }

    this.foldersTracker.off(`changed`, this.onFoldersChanged);
    this.filesTracker.off(`changed`, this.onFilesChanged);

    await this.foldersTracker.stop();
    await this.filesTracker.stop();
  }
}

class ManagedProcess extends EventEmitter<{
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
    spawnOptions: SpawnOptions
  ) {
    super();

    this.command = exec.command.trim();
    this.args = exec.args || [];
    this.killSignal = killSignal;
    this.spawnOptions = spawnOptions;
  }

  public start(): void {
    const process = spawn(this.command, this.args, {
      stdio: 'inherit',
      shell: true,
      ...this.spawnOptions,
    });
    this.running = {
      process,
      finished: new Promise<number | null>((resolve, reject) => {
        process.once('close', code => {
          console.log(`Child process exited with code ${code}`);
          resolve(code);
        });

        process.once('error', err => {
          console.error('Failed to start child process.', err);
          reject(err);
        });
      })
        .catch(e => {
          this.emit(`error`, e);
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
    running.process.kill(this.killSignal);
    return (running.killing = (async () => {
      const code = await running.finished;
      this.emit(`killed`, code);
    })());
  }
}

export interface INodemonOptions {
  watch: string[];
  ignore?: string[];
  delay?: number; // in ms
  exec: string | { command: string; args?: string[] };
  filesCheckInterval?: number; // in ms
  dirsCheckInterval?: number; // in ms
  killSignal?: NodeJS.Signals | number;
  spawnOptions?: SpawnOptions;
  verbose?: boolean;
  logChangedFiles?: boolean;
  logTrackedFiles?: boolean;
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
  private process: ManagedProcess;

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
      killSignal: options.killSignal ?? 'SIGTERM',
      spawnOptions: options.spawnOptions ?? {},
      verbose: options.verbose ?? false,
      logChangedFiles: options.logChangedFiles ?? false,
      logTrackedFiles: options.logTrackedFiles ?? false,
    };

    if (this.options.verbose) {
      console.log('Nodemon configured with:', this.options);
    }

    this.watcher = new NodemonFileWatcher(
      () => {
        this.scheduleRestart();
      },
      this.options.watch,
      this.options.ignore,
      this.options.filesCheckInterval,
      this.options.dirsCheckInterval,
      this.options.verbose,
      this.options.logChangedFiles,
      this.options.logTrackedFiles
    );

    const [exec, spawnOptions] =
      typeof this.options.exec === `string`
        ? ([{ command: this.options.exec }, { ...this.options.spawnOptions, shell: true }] as const)
        : ([this.options.exec, this.options.spawnOptions] as const);

    this.process = new ManagedProcess(exec, this.options.killSignal, spawnOptions);

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
    console.log('Starting nodemon...');
    this.watcher.start();
    this.process.start();

    this.isRunning = true;
  }

  public async stop(): Promise<void> {
    if (!this.isRunning) {
      return;
    }
    console.log('Stopping nodemon...');
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
    console.log('Restarting process...');
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
