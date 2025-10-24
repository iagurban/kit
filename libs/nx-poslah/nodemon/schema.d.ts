import { SpawnOptions } from 'child_process';

export interface NodemonExecutorSchema {
  /**
   * The script to run if 'exec' is not specified (e.g., 'server.js').
   */
  script?: string;
  /**
   * The command to execute (e.g., 'ts-node app.ts'). Takes precedence over 'script'.
   */
  exec?: string;
  /**
   * Arguments to pass to the script itself.
   */
  scriptArgs?: string[];
  /**
   * Globs to watch for changes, or a false value to disable watching, run the process once and exit.
   */
  watch: string[] | boolean;
  /**
   * File patterns or directories to ignore.
   */
  ignore?: string[];
  /**
   * Comma-separated list of file extensions to watch (e.g., 'js,pug,hbs').
   */
  ext?: string;
  /**
   * Show detail on what is causing restarts.
   */
  verbose?: boolean;
  /**
   * The working directory to run nodemon from. It will be created if it doesn't exist.
   */
  cwd?: string;
  /**
   * The package runner to use for executing the command (e.g., 'yarn', 'npx', 'pnpm').
   */
  runner?: string;
  /**
   * Delay in ms before restarting the process after a file change.
   */
  delay?: number;
  /**
   * The signal to send to the process when killing it (e.g., 'SIGTERM').
   */
  signal?: string;
  /**
   * Log the files that changed, triggering a restart.
   */
  logChangedFiles?: boolean;
  /**
   * Log all the files and directories being watched.
   */
  logTrackedFiles?: boolean;
  /**
   * How often to check for file changes in milliseconds.
   */
  filesCheckInterval?: number;
  /**
   * How often to check for directory changes in milliseconds.
   */
  dirsCheckInterval?: number;
  /**
   * Spawn options for the child process, as a JSON object.
   */
  spawnOptions?: SpawnOptions;
}
