/**
 * Represents a single command to be run by the concurrently executor.
 */
interface Process {
  /** The command to execute for this process. */
  command: string;
  /** A custom name for the process, used in the prefix. If not provided, a default will be used. */
  name?: string;
  /** A chalk color for the prefix (e.g., 'blue', 'magenta', '#ff0000'). */
  color?: string;
  /** If true, hides the output of this process. */
  hide?: boolean;
}

/**
 * Interface for the Poslah Concurrently Executor options.
 */
export interface ConcurrentlyExecutorSchema {
  /** An array of process objects to run concurrently. */
  processes: Process[];
  /** Specifies which command(s) must exit with code 0 for the entire run to be considered a success. E.g., 'first', 'last', 'all', 'command-API', '!command-0'. */
  success?: string;
  /** The maximum number of processes that should run at once. */
  maxProcesses?: number;
  /** If true, outputs only the raw output of processes, disabling prettifying and coloring. */
  raw?: boolean;
  /** If true, disables colors from concurrently's logging. */
  noColor?: boolean;
  /** If true, orders the output as if the commands were run sequentially. */
  group?: boolean;
  /** If true, shows timing information for all processes when they end. */
  timings?: boolean;
  /** Passthrough additional arguments to commands (accessible via placeholders) instead of treating them as commands. */
  passthroughArguments?: boolean;
  /** A list of cleanup commands to execute before concurrently exits. */
  teardown?: string[];
  /** Prefix used in logging for each process. Can be a keyword or a custom template like '{time}-{pid}'. */
  prefix?: 'index' | 'pid' | 'time' | 'command' | 'name' | 'none' | string;
  /** Limits how many characters of the command are displayed in the 'command' prefix. */
  prefixLength?: number;
  /** A Unicode format string for the timestamp prefix, e.g., 'yyyy-MM-dd HH:mm:ss.SSS'. */
  timestampFormat?: string;
  /** Pads short prefixes with spaces so that all prefixes have the same length. */
  padPrefix?: boolean;
  /** Whether keyboard input should be forwarded to the child processes. */
  handleInput?: boolean;
  /** The name or index of the child process to which keyboard input should be sent by default. */
  defaultInputTarget?: string;
  /** If true, kills all other processes as soon as the first one exits. */
  killOthers?: boolean;
  /** If true, kills all other processes if one of them exits with a non-zero status code. */
  killOthersOnFail?: boolean;
  /** The signal to send when killing other processes (e.g., 'SIGTERM', 'SIGKILL'). */
  killSignal?: string;
  /** How many milliseconds to wait before forcefully terminating a process. */
  killTimeout?: number;
  /** How many times a process that has died should be restarted. A negative number means restart forever. */
  restartTries?: number;
  /** Delay in milliseconds before restarting a process. Can also be the string 'exponential'. */
  restartAfter?: number | 'exponential';
  /** The working directory to run commands from. Will be created if it doesn't exist. */
  cwd?: string;
  /** The package runner to use for executing the command (e.g., 'yarn', 'npx', 'pnpm'). */
  runner?: string;
}
