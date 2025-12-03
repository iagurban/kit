import { spawn } from 'node:child_process';
import { EventEmitter } from 'node:events';

import * as fs from 'fs';
import { glob } from 'glob'; // Import glob to be mocked

import { sleep } from '../core/sleep';
import { AnyAnyFunction } from '../core/types';
import { ManagedProcess, MtimeTracker, Nodemon, NodemonFileWatcher } from './nodemon';

type Any = ReturnType<AnyAnyFunction>;

jest.mock('glob', () => ({
  glob: jest.fn(),
}));

jest.mock('fs', () => ({
  promises: {
    stat: jest.fn(),
  },
}));

jest.mock('../core/sleep', () => ({
  sleep: jest.fn((ms: number) => new Promise(resolve => setTimeout(resolve, ms))),
}));

jest.mock('node:child_process', () => ({
  spawn: jest.fn(),
}));

const mockedStat = fs.promises.stat as unknown as jest.Mock;
const mockedSleep = sleep as jest.Mock;
const mockedGlob = glob as unknown as jest.Mock;
const mockedSpawn = spawn as unknown as jest.Mock;

describe(`nodemon`, () => {
  const log = jest.fn();

  // Helper to advance Jest's fake timers
  const tick = async (ms: number) => {
    await jest.advanceTimersByTimeAsync(ms);
  };

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  describe('MtimeTracker', () => {
    let tracker: MtimeTracker;
    const CHECK_INTERVAL = 100;

    beforeEach(() => {
      tracker = new MtimeTracker(CHECK_INTERVAL, log);
    });

    afterEach(async () => {
      if (tracker.started) {
        const stopPromise = tracker.stop();
        await jest.runOnlyPendingTimersAsync();
        await stopPromise;
      }
    });

    it('should emit "added" when a new path is added', () => {
      const addedSpy = jest.fn();
      tracker.on('added', addedSpy);
      tracker.add('/test/file.js');
      expect(addedSpy).toHaveBeenCalledWith('/test/file.js');
      expect(addedSpy).toHaveBeenCalledTimes(1);
    });

    it('should not emit "added" if the path already exists', () => {
      const addedSpy = jest.fn();
      tracker.add('/test/file.js'); // Add it once
      tracker.on('added', addedSpy);
      tracker.add('/test/file.js'); // Add it again
      expect(addedSpy).not.toHaveBeenCalled();
    });

    it('should emit "removed" when a path is removed', () => {
      const removedSpy = jest.fn();
      tracker.add('/test/file.js'); // Add it first
      tracker.on('removed', removedSpy);
      tracker.remove('/test/file.js');
      expect(removedSpy).toHaveBeenCalledWith('/test/file.js');
      expect(removedSpy).toHaveBeenCalledTimes(1);
    });

    it('should not emit "removed" if the path does not exist', () => {
      const removedSpy = jest.fn();
      tracker.on('removed', removedSpy);
      tracker.remove('/test/file.js');
      expect(removedSpy).not.toHaveBeenCalled();
    });

    it('should start polling when start() is called', async () => {
      tracker.start();
      expect(mockedSleep).not.toHaveBeenCalled();
      await tick(0);
      expect(mockedSleep).toHaveBeenCalledWith(CHECK_INTERVAL);
      await tick(CHECK_INTERVAL);
      expect(mockedSleep).toHaveBeenCalledTimes(2);
    });

    it('should not start a second polling loop if start() is called again', async () => {
      tracker.start();
      await tick(0);
      expect(mockedSleep).toHaveBeenCalledTimes(1);

      tracker.start(); // Call start again
      await tick(CHECK_INTERVAL);
      // If a second loop was started, sleep would be called twice in this interval
      expect(mockedSleep).toHaveBeenCalledTimes(2);
    });

    it('should detect a new file on the first poll and emit "changed"', async () => {
      const changedSpy = jest.fn();
      tracker.on('changed', changedSpy);
      const testFile = '/test/new-file.js';
      mockedStat.mockResolvedValue({ mtime: new Date(1000) });
      tracker.add(testFile);
      tracker.start();
      await tick(0);
      expect(mockedStat).toHaveBeenCalledWith(testFile);
      expect(changedSpy).toHaveBeenCalledWith([testFile]);
    });

    it('should not emit "changed" if mtime is the same', async () => {
      const changedSpy = jest.fn();
      const testFile = '/test/no-change.js';
      mockedStat.mockResolvedValue({ mtime: new Date(1000) });
      tracker.add(testFile);
      tracker.start();
      await tick(0); // First poll establishes baseline

      tracker.on('changed', changedSpy);
      await tick(CHECK_INTERVAL); // Second poll

      expect(changedSpy).not.toHaveBeenCalled();
    });

    it('should detect only the modified file out of multiple files', async () => {
      const changedSpy = jest.fn();
      const file1 = '/test/file1.js';
      const file2 = '/test/file2.js';
      const file3 = '/test/file3.js';

      // Setup stat to return different times for each file
      mockedStat.mockImplementation(async (path: string) => {
        if (path === file1) {
          return { mtime: new Date(1000) };
        }
        if (path === file2) {
          return { mtime: new Date(1000) };
        }
        if (path === file3) {
          return { mtime: new Date(1000) };
        }
        throw new Error('File not found');
      });

      tracker.add(file1);
      tracker.add(file2);
      tracker.add(file3);
      tracker.start();
      await tick(0); // Baseline poll

      // Modify only file2
      mockedStat.mockImplementation(async (path: string) => {
        if (path === file1) {
          return { mtime: new Date(1000) };
        } // Unchanged
        if (path === file2) {
          return { mtime: new Date(2000) };
        } // Changed
        if (path === file3) {
          return { mtime: new Date(1000) };
        } // Unchanged
        throw new Error('File not found');
      });

      tracker.on('changed', changedSpy);
      await tick(CHECK_INTERVAL);

      expect(changedSpy).toHaveBeenCalledWith([file2]);
      expect(changedSpy).toHaveBeenCalledTimes(1);
    });

    it('should detect a removed file and emit "changed"', async () => {
      const testFile = '/test/deleted-file.js';
      const changedSpy = jest.fn();
      mockedStat.mockResolvedValue({ mtime: new Date(1000) });
      tracker.add(testFile);
      tracker.start();
      await tick(0);

      tracker.on('changed', changedSpy);
      mockedStat.mockRejectedValue(new Error('ENOENT'));
      await tick(CHECK_INTERVAL);

      expect(changedSpy).toHaveBeenCalledWith([testFile]);
      expect(log).toHaveBeenCalledWith(
        'error',
        expect.stringContaining('Cannot stat path'),
        expect.any(Object)
      );
    });

    it('should stop polling when stop() is called', async () => {
      tracker.start();
      await tick(0);
      expect(mockedSleep).toHaveBeenCalledTimes(1);

      const stopPromise = tracker.stop();
      await jest.runOnlyPendingTimersAsync();
      await stopPromise;

      expect(tracker.started).toBe(false);
      mockedSleep.mockClear();
      await tick(CHECK_INTERVAL * 2);
      expect(mockedSleep).not.toHaveBeenCalled();
    });

    it('should be idempotent on stop', async () => {
      tracker.start();
      await tick(0);
      expect(mockedSleep).toHaveBeenCalledTimes(1);

      const stopPromise1 = tracker.stop();
      const stopPromise2 = tracker.stop(); // Call stop again
      await jest.runOnlyPendingTimersAsync();
      await Promise.all([stopPromise1, stopPromise2]);

      expect(tracker.started).toBe(false);
      mockedSleep.mockClear();
      await tick(CHECK_INTERVAL * 2);
      expect(mockedSleep).not.toHaveBeenCalled();
    });

    it('should handle stop() being called on a not-started tracker', async () => {
      // Do not call tracker.start()
      const stopPromise = tracker.stop();
      await jest.runOnlyPendingTimersAsync();
      await stopPromise;

      expect(tracker.started).toBe(false);
      expect(mockedSleep).not.toHaveBeenCalled(); // Ensure no polling was attempted
      // No errors should be thrown, and it should resolve gracefully
    });
  });

  describe('ManagedProcess', () => {
    let managedProcess: ManagedProcess;
    let mockChildProcess: EventEmitter & { pid?: number };
    let processKillSpy: jest.SpyInstance;
    let originalPlatform: NodeJS.Platform;

    beforeEach(() => {
      mockChildProcess = new EventEmitter() as unknown as EventEmitter & { pid?: number };
      mockChildProcess.pid = 1234;
      mockedSpawn.mockReturnValue(mockChildProcess);

      processKillSpy = jest.spyOn(process, 'kill').mockImplementation(() => true);
      originalPlatform = process.platform;
    });

    afterEach(() => {
      processKillSpy.mockRestore();
      Object.defineProperty(process, 'platform', { value: originalPlatform });
    });

    it('should spawn a process when start() is called', () => {
      managedProcess = new ManagedProcess({ command: 'node', args: ['my-app.js'] }, 'SIGTERM', {}, log);
      const startedSpy = jest.fn();
      managedProcess.on('started', startedSpy);
      managedProcess.start();
      expect(mockedSpawn).toHaveBeenCalledWith('node', ['my-app.js'], expect.any(Object));
      expect(startedSpy).toHaveBeenCalled();
    });

    it('should not spawn a new process if one is already running', () => {
      managedProcess = new ManagedProcess({ command: 'node' }, 'SIGTERM', {}, log);
      managedProcess.start();
      expect(mockedSpawn).toHaveBeenCalledTimes(1);
      managedProcess.start();
      expect(mockedSpawn).toHaveBeenCalledTimes(1);
    });

    it('should emit "error" if the process fails to spawn', async () => {
      const error = new Error('Spawn failed');
      const errorSpy = jest.fn();
      managedProcess = new ManagedProcess({ command: 'node' }, 'SIGTERM', {}, log);
      managedProcess.on('error', errorSpy);
      managedProcess.start();
      mockChildProcess.emit('error', error);
      await tick(0);
      expect(errorSpy).toHaveBeenCalledWith(error);
    });

    it('should emit "killed" with the exit code when the process closes', async () => {
      const killedSpy = jest.fn();
      managedProcess = new ManagedProcess({ command: 'node' }, 'SIGTERM', {}, log);
      managedProcess.on('killed', killedSpy);
      managedProcess.start();
      const killPromise = managedProcess.kill();
      mockChildProcess.emit('close', 123);
      await killPromise;
      expect(killedSpy).toHaveBeenCalledWith(123);
    });

    it('should use process.kill with the specified signal', async () => {
      managedProcess = new ManagedProcess({ command: 'node' }, 'SIGINT', {}, log);
      managedProcess.start();
      const killPromise = managedProcess.kill();
      expect(processKillSpy).toHaveBeenCalledWith(-mockChildProcess.pid!, 'SIGINT');
      mockChildProcess.emit('close', 0);
      await killPromise;
    });

    it('should force kill with SIGKILL if the process does not exit gracefully', async () => {
      managedProcess = new ManagedProcess({ command: 'node' }, 'SIGTERM', {}, log);
      managedProcess.start();
      const killPromise = managedProcess.kill();
      expect(processKillSpy).toHaveBeenCalledWith(-mockChildProcess.pid!, 'SIGTERM');
      await tick(5000);
      expect(processKillSpy).toHaveBeenCalledWith(-mockChildProcess.pid!, 'SIGKILL');
      mockChildProcess.emit('close', 1);
      await killPromise;
      expect(processKillSpy).toHaveBeenCalledTimes(2);
    });

    it('should not attempt to kill a process that has no PID', async () => {
      managedProcess = new ManagedProcess({ command: 'node' }, 'SIGTERM', {}, log);
      managedProcess.start();
      mockChildProcess.pid = undefined;
      const killPromise = managedProcess.kill();
      expect(processKillSpy).not.toHaveBeenCalled();
      expect(log).toHaveBeenCalledWith('warn', expect.stringContaining('no PID'));
      mockChildProcess.emit('close', 0);
      await killPromise;
    });

    it('should handle errors during process.kill and log a warning', async () => {
      processKillSpy.mockImplementation(() => {
        throw new Error('ESRCH');
      });
      managedProcess = new ManagedProcess({ command: 'node' }, 'SIGTERM', {}, log);
      managedProcess.start();
      const killPromise = managedProcess.kill();
      expect(log).toHaveBeenCalledWith(
        'warn',
        `Failed to kill process group ${mockChildProcess.pid}. It may have already exited.`,
        { error: 'ESRCH' }
      );
      mockChildProcess.emit('close', 0);
      await killPromise;
    });

    it('should use taskkill on Windows', async () => {
      Object.defineProperty(process, 'platform', { value: 'win32' });
      managedProcess = new ManagedProcess({ command: 'node' }, 'SIGTERM', {}, log);
      managedProcess.start();
      const killPromise = managedProcess.kill();
      expect(mockedSpawn).toHaveBeenCalledWith('taskkill', ['/pid', '1234', '/f', '/t']);
      mockChildProcess.emit('close', 0);
      await killPromise;
    });

    it('should not attempt to kill again if already killing', async () => {
      managedProcess = new ManagedProcess({ command: 'node' }, 'SIGTERM', {}, log);
      managedProcess.start();
      const killPromise1 = managedProcess.kill();
      const killPromise2 = managedProcess.kill(); // Call kill again
      expect(processKillSpy).toHaveBeenCalledTimes(1);
      mockChildProcess.emit('close', 0);
      await Promise.all([killPromise1, killPromise2]);
    });

    it('should do nothing if kill is called on a stopped process', async () => {
      managedProcess = new ManagedProcess({ command: 'node' }, 'SIGTERM', {}, log);
      // Don't call start()
      await managedProcess.kill();
      expect(processKillSpy).not.toHaveBeenCalled();
    });

    it('should not clear the running process if a new one has started', async () => {
      managedProcess = new ManagedProcess({ command: 'node' }, 'SIGTERM', {}, log);

      // --- First Start ---
      managedProcess.start();
      const oldProcess = mockChildProcess;
      const oldFinishedPromise = (managedProcess as Any).running.finished;
      expect((managedProcess as Any).running.process).toBe(oldProcess);

      // --- Simulate Restart (by clearing and starting again) ---
      // Manually clear the running state to allow a new process to start
      (managedProcess as Any).running = null;

      const newMockProcess = new EventEmitter() as unknown as EventEmitter & { pid?: number };
      newMockProcess.pid = 5678;
      mockedSpawn.mockReturnValue(newMockProcess);

      managedProcess.start();
      expect((managedProcess as Any).running.process).toBe(newMockProcess);

      // --- Trigger close on the OLD process ---
      // Now, emit 'close' on the *old* process. Its 'finished' promise will resolve.
      oldProcess.emit('close', 0);
      await oldFinishedPromise; // Wait for the finally() block of the old process

      // --- Assert ---
      // The 'finally' block of the old process should NOT have cleared the 'running' state,
      // because `this.running.process` now points to the new process.
      expect((managedProcess as Any).running).not.toBeNull();
      expect((managedProcess as Any).running.process).toBe(newMockProcess);
    });
  });

  describe('NodemonFileWatcher', () => {
    let fileWatcher: NodemonFileWatcher;
    const onChanges = jest.fn();

    afterEach(async () => {
      if (fileWatcher) {
        const stopPromise = fileWatcher.stop();
        await jest.runOnlyPendingTimersAsync();
        await stopPromise;
      }
    });

    it('should perform an initial scan on start', async () => {
      mockedGlob.mockResolvedValue(['/test/file.js']);
      fileWatcher = new NodemonFileWatcher(
        onChanges,
        ['**/*.js'],
        [],
        null,
        10,
        40,
        100,
        false,
        false,
        false,
        null,
        log
      );

      await fileWatcher.start();
      await tick(100); // Allow re-globbing interval to pass once

      expect(mockedGlob).toHaveBeenCalledWith(['**/*.js'], expect.any(Object));
    });

    it('should filter files by extension if provided', async () => {
      mockedGlob.mockResolvedValue(['/test/file.js', '/test/style.css', '/test/another.js']);
      const allowedExtensions = new Set(['.js']);

      fileWatcher = new NodemonFileWatcher(
        onChanges,
        ['**/*'],
        [],
        allowedExtensions,
        10,
        40,
        100,
        false,
        false,
        true,
        null,
        log
      );

      await fileWatcher.start();
      await tick(100);

      expect(log).toHaveBeenCalledWith('log', 'Tracked files:', {
        files: ['/test/file.js', '/test/another.js'],
      });
    });

    it('should trigger onChanges when a file changes', async () => {
      const testFile = '/test/file.js';
      mockedGlob.mockResolvedValue([testFile]);
      mockedStat.mockResolvedValue({ mtime: new Date(1000) });

      fileWatcher = new NodemonFileWatcher(
        onChanges,
        ['**/*.js'],
        [],
        null,
        10,
        40,
        100,
        false,
        false,
        false,
        null,
        log
      );
      await fileWatcher.start();
      await tick(100); // Initial scan

      // Simulate file change
      mockedStat.mockResolvedValue({ mtime: new Date(2000) });
      await tick(10); // filesCheckInterval

      expect(onChanges).toHaveBeenCalledWith([testFile]);
    });

    it('should trigger a re-scan when a directory changes', async () => {
      const initialFile = '/test/dir1/file1.js';
      const newFile = '/test/dir2/file2.js';

      mockedGlob.mockResolvedValue([initialFile]);
      mockedStat.mockResolvedValue({ mtime: new Date(1000) });

      fileWatcher = new NodemonFileWatcher(
        onChanges,
        ['**/*.js'],
        [],
        null,
        10,
        40,
        100,
        true,
        false,
        true,
        null,
        log
      );
      await fileWatcher.start();
      await tick(100);

      expect(log).toHaveBeenCalledWith('log', 'Tracked directories:', { dirs: ['/test/dir1'] });
      mockedGlob.mockClear();

      mockedGlob.mockResolvedValue([initialFile, newFile]);
      mockedStat.mockResolvedValue({ mtime: new Date(2000) });
      await tick(40); // dirsCheckInterval

      expect(log).toHaveBeenCalledWith('log', 'Folders changes detected, re-globbing...');
      await tick(0); // Allow performScan promise to resolve
      expect(mockedGlob).toHaveBeenCalledTimes(1);
      expect(log).toHaveBeenCalledWith('log', 'Tracked directories:', { dirs: ['/test/dir1', '/test/dir2'] });
    });

    it('should be idempotent on start and stop', async () => {
      fileWatcher = new NodemonFileWatcher(
        onChanges,
        [],
        [],
        null,
        10,
        40,
        100,
        false,
        false,
        false,
        null,
        log
      );
      await fileWatcher.start();
      await fileWatcher.start(); // second call
      const stopPromise1 = fileWatcher.stop();
      const stopPromise2 = fileWatcher.stop(); // second call
      await jest.runOnlyPendingTimersAsync();
      await Promise.all([stopPromise1, stopPromise2]);
      // No assertions needed, the test passes if it doesn't hang or throw
    });

    it('should log changed files when enabled', async () => {
      const testFile = '/test/file.js';
      mockedGlob.mockResolvedValue([testFile]);
      mockedStat.mockResolvedValue({ mtime: new Date(1000) });

      fileWatcher = new NodemonFileWatcher(
        onChanges,
        ['**/*.js'],
        [],
        null,
        10,
        40,
        100,
        true, // verbose
        true, // logChangedFiles
        false,
        null,
        log
      );
      await fileWatcher.start();
      await tick(100); // Initial scan

      mockedStat.mockResolvedValue({ mtime: new Date(2000) });
      await tick(10);

      expect(log).toHaveBeenCalledWith('log', '  Changed files:', { paths: [testFile] });
    });
  });

  describe('Nodemon', () => {
    let nodemon: Nodemon;
    let mockChildProcess: EventEmitter & { pid?: number };
    let processKillSpy: jest.SpyInstance;

    beforeEach(() => {
      mockChildProcess = new EventEmitter() as unknown as EventEmitter & { pid?: number };
      mockChildProcess.pid = 5678;
      mockedSpawn.mockReturnValue(mockChildProcess);

      processKillSpy = jest.spyOn(process, 'kill').mockImplementation(() => {
        Promise.resolve().then(() => mockChildProcess.emit('close', 0));
        return true;
      });

      mockedGlob.mockResolvedValue([]);
      mockedStat.mockResolvedValue({ mtime: new Date(1000) });

      nodemon = new Nodemon({
        watch: ['**/*.js'],
        exec: 'node my-app.js',
        delay: 200,
        log,
        filesCheckInterval: 10,
        dirsCheckInterval: 40,
        reGlobbingInterval: 100,
      });
    });

    afterEach(async () => {
      const destroyPromise = nodemon.destroy();
      await jest.runOnlyPendingTimersAsync();
      await destroyPromise;
      processKillSpy.mockRestore();
    });

    it('should start watcher on start() and start process on first change', async () => {
      const processStartedSpy = jest.fn();
      nodemon.on('process-started', processStartedSpy);

      await nodemon.start();

      expect(mockedSpawn).not.toHaveBeenCalled();

      mockedGlob.mockResolvedValue(['/test/app.js']);
      await tick(100); // reGlobbingInterval to find the file

      mockedStat.mockResolvedValue({ mtime: new Date(2000) });
      await tick(10); // filesCheckInterval to detect mtime change

      await tick(200); // Wait for restart delay
      await jest.runOnlyPendingTimersAsync();

      expect(log).toHaveBeenCalledWith('log', 'Restarting process...');
      expect(mockedSpawn).toHaveBeenCalledWith('node my-app.js', [], expect.any(Object));
      expect(processStartedSpy).toHaveBeenCalled();
    });

    it('should restart the process on subsequent file changes', async () => {
      mockedGlob.mockResolvedValue(['/test/app.js']);
      await nodemon.start();

      await tick(100 + 10 + 200); // Initial scan, change, and restart
      await jest.runOnlyPendingTimersAsync();
      expect(mockedSpawn).toHaveBeenCalledTimes(1);

      const processKilledSpy = jest.fn();
      nodemon.on('process-killed', processKilledSpy);

      mockedStat.mockResolvedValue({ mtime: new Date(3000) });
      await tick(10); // filesCheckInterval

      await tick(200); // restart delay
      await jest.runOnlyPendingTimersAsync();

      expect(log).toHaveBeenCalledWith('log', 'Restarting process...');
      expect(processKillSpy).toHaveBeenCalledWith(-mockChildProcess.pid!, 'SIGTERM');

      expect(processKilledSpy).toHaveBeenCalledWith(0);
      expect(mockedSpawn).toHaveBeenCalledTimes(2);
    });

    it('should debounce restarts', async () => {
      mockedGlob.mockResolvedValue(['/test/app.js']);
      await nodemon.start();

      await tick(100 + 10 + 200); // Initial start
      await jest.runOnlyPendingTimersAsync();
      expect(mockedSpawn).toHaveBeenCalledTimes(1);
      mockedSpawn.mockClear();
      processKillSpy.mockClear();

      mockedStat.mockResolvedValue({ mtime: new Date(3000) });
      await tick(10); // change 1
      await tick(50);
      mockedStat.mockResolvedValue({ mtime: new Date(4000) });
      await tick(10); // change 2

      await tick(150); // Not enough time for restart
      expect(processKillSpy).not.toHaveBeenCalled();

      await tick(50); // Pass the delay for the *last* change
      await jest.runOnlyPendingTimersAsync();

      expect(processKillSpy).toHaveBeenCalledTimes(1);
      expect(mockedSpawn).toHaveBeenCalledTimes(1);
    });

    it('should stop watcher and kill process on stop()', async () => {
      mockedGlob.mockResolvedValue(['/test/app.js']);
      await nodemon.start();

      await tick(100 + 10 + 200); // Initial start
      await jest.runOnlyPendingTimersAsync();
      expect(mockedSpawn).toHaveBeenCalledTimes(1);

      const stopPromise = nodemon.stop();
      await jest.runOnlyPendingTimersAsync();
      await stopPromise;

      expect(log).toHaveBeenCalledWith('log', 'Stopping nodemon...');
      expect(processKillSpy).toHaveBeenCalledTimes(1);

      mockedSleep.mockClear();
      await tick(500); // Check that polling has stopped
      expect(mockedSleep).not.toHaveBeenCalled();
    });

    it('should log verbose messages if enabled', async () => {
      nodemon = new Nodemon({
        watch: ['**/*.js'],
        exec: 'node my-app.js',
        verbose: true,
        log,
      });

      await nodemon.start();
      expect(log).toHaveBeenCalledWith('log', 'Nodemon configured with:', expect.any(Object));
    });

    it('should handle exec as an object', async () => {
      nodemon = new Nodemon({
        watch: ['**/*.js'],
        exec: { command: 'node', args: ['my-app.js'] },
        log,
        filesCheckInterval: 10,
      });

      await nodemon.start();
      mockedGlob.mockResolvedValue(['/test/app.js']);
      await tick(100);
      mockedStat.mockResolvedValue({ mtime: new Date(2000) });
      await tick(10);
      await tick(1000); // delay
      await jest.runOnlyPendingTimersAsync();

      expect(mockedSpawn).toHaveBeenCalledWith('node', ['my-app.js'], expect.any(Object));
    });

    it('should throw an error for unsupported exec string with shell=false', () => {
      expect(() => {
        new Nodemon({
          watch: ['**/*.js'],
          exec: 'node my-app.js',
          spawnOptions: { shell: false },
          log,
        });
      }).toThrow('using exec-options with shell=false is not supported');
    });

    it('should not schedule a restart if destroyed', async () => {
      await nodemon.start();

      const destroyPromise = nodemon.destroy();
      await jest.runOnlyPendingTimersAsync();
      await destroyPromise;

      // Clear mocks from the destroy() call
      processKillSpy.mockClear();

      // Manually trigger scheduleRestart after destruction
      (nodemon as Any).scheduleRestart();

      // Ensure no timeout was set
      expect((nodemon as Any).restartTimeout).toBeNull();

      // Advance timers just in case, and verify no restart happens
      await jest.runOnlyPendingTimersAsync();
      expect(processKillSpy).not.toHaveBeenCalled();
    });

    it('should not start process in restart() if destroyed', async () => {
      await nodemon.start();

      const destroyPromise = nodemon.destroy();
      await jest.runOnlyPendingTimersAsync();
      await destroyPromise;

      // Clear mocks from the destroy() call
      processKillSpy.mockClear();
      mockedSpawn.mockClear();

      // Manually trigger restart after destruction
      await (nodemon as Any).restart();

      // It will call kill, but should return before starting again
      expect(processKillSpy).toHaveBeenCalledTimes(0);
      expect(mockedSpawn).not.toHaveBeenCalled();
    });

    it('should not start if already destroyed', async () => {
      const destroyPromise = nodemon.destroy();
      await jest.runOnlyPendingTimersAsync();
      await destroyPromise;
      await expect(nodemon.start()).rejects.toThrow('start called after destroy');
    });

    it('should handle being destroyed multiple times', async () => {
      const destroyPromise = nodemon.destroy();
      await jest.runOnlyPendingTimersAsync();
      await destroyPromise;
      await expect(nodemon.destroy()).resolves.toBeUndefined();
    });

    it('should use default console logger if none is provided', async () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      nodemon = new Nodemon({
        watch: ['**/*.js'],
        exec: 'node my-app.js',
      });
      await nodemon.start();
      expect(consoleLogSpy).toHaveBeenCalledWith('Starting nodemon...');

      // test with payload
      (nodemon as Any).options.log('error', 'test error', { foo: 'bar' });
      expect(consoleErrorSpy).toHaveBeenCalledWith('test error', { foo: 'bar' });

      consoleLogSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });

    it('should be idempotent on start', async () => {
      await nodemon.start();
      await nodemon.start(); // Call start again
      expect(log).toHaveBeenCalledWith('log', 'Starting nodemon...');
      expect(log).toHaveBeenCalledTimes(1); // Should only log once
    });

    it('should be idempotent on stop', async () => {
      await nodemon.start();
      await tick(100 + 10 + 200); // Initial start
      await jest.runOnlyPendingTimersAsync();
      log.mockClear();

      const stopPromise1 = nodemon.stop();
      await jest.runOnlyPendingTimersAsync();
      await stopPromise1;

      const stopPromise2 = nodemon.stop(); // Call stop again
      await jest.runOnlyPendingTimersAsync();
      await stopPromise2;

      expect(log.mock.calls.filter(call => call[1] === 'Stopping nodemon...').length).toBe(1);
    });

    it('should forward file-removed event', async () => {
      const fileRemovedSpy = jest.fn();
      nodemon.on('file-removed', fileRemovedSpy);

      mockedGlob.mockResolvedValue(['/test/app.js']);
      await nodemon.start();
      await jest.runOnlyPendingTimersAsync();

      mockedGlob.mockResolvedValue([]); // Now the file is gone
      await tick(100); // reGlobbingInterval
      await jest.runOnlyPendingTimersAsync();

      expect(fileRemovedSpy).toHaveBeenCalledWith('/test/app.js');
    });

    it('should forward dir-removed event', async () => {
      const dirRemovedSpy = jest.fn();
      nodemon.on('dir-removed', dirRemovedSpy);

      mockedGlob.mockResolvedValue(['/test/dir1/app.js']);
      await nodemon.start();
      await jest.runOnlyPendingTimersAsync();

      mockedGlob.mockResolvedValue(['/test/dir2/app.js']); // Switch to a new dir
      await tick(100); // reGlobbingInterval
      await jest.runOnlyPendingTimersAsync();

      expect(dirRemovedSpy).toHaveBeenCalledWith('/test/dir1');
    });

    it('should forward process-error event', async () => {
      const processErrorSpy = jest.fn();
      nodemon.on('process-error', processErrorSpy);

      const error = new Error('Spawn failed');
      mockedSpawn.mockImplementationOnce(() => {
        const child = new EventEmitter();
        Promise.resolve().then(() => child.emit('error', error));
        return child as Any;
      });

      await nodemon.start();

      // Trigger a restart
      mockedGlob.mockResolvedValue(['/test/app.js']);
      await tick(100);
      mockedStat.mockResolvedValue({ mtime: new Date(2000) });
      await tick(10);
      await tick(200); // delay
      await jest.runOnlyPendingTimersAsync();

      expect(processErrorSpy).toHaveBeenCalledWith(error);
    });

    it('should only watch files with allowed extensions', async () => {
      nodemon = new Nodemon({
        watch: ['**/*'],
        exec: 'node my-app.js',
        extensions: ['js', 'ts'],
        log,
        filesCheckInterval: 10,
        reGlobbingInterval: 100,
        delay: 200,
      });

      await nodemon.start();

      const files = ['/test/app.js', '/test/style.css', '/test/script.ts'];
      mockedGlob.mockResolvedValue(files);

      const fileMtimes: Record<string, Date> = {
        '/test/app.js': new Date(1000),
        '/test/style.css': new Date(1000),
        '/test/script.ts': new Date(1000),
      };
      mockedStat.mockImplementation(async (path: string) => ({ mtime: fileMtimes[path] }));

      // Let initial scan and restart happen
      await tick(100); // re-globbing
      await tick(10); // file check
      await tick(200); // delay
      await jest.runOnlyPendingTimersAsync();
      expect(mockedSpawn).toHaveBeenCalledTimes(1);
      mockedSpawn.mockClear();

      // --- Test that an allowed extension triggers a restart ---
      fileMtimes['/test/script.ts'] = new Date(2000); // change ts file

      await tick(10); // file check
      await tick(200); // delay
      await jest.runOnlyPendingTimersAsync();

      expect(mockedSpawn).toHaveBeenCalledTimes(1);
      mockedSpawn.mockClear();

      // --- Test that a disallowed extension does NOT trigger a restart ---
      fileMtimes['/test/style.css'] = new Date(3000); // change css file

      await tick(10); // file check
      await tick(200); // delay
      await jest.runOnlyPendingTimersAsync();

      expect(mockedSpawn).not.toHaveBeenCalled();
    });
  });
});
