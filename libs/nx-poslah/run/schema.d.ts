/**
 * A command can be a simple string to be executed in the shell,
 * or an object specifying the command and its arguments.
 */
export type Command =
  | string
  | {
      cmd: string;
      args?: string[];
    };

export interface RunExecutorSchema {
  /** An array of commands to execute in sequence. */
  commands: Command[];
  /** If true, stops executing commands after the first one fails. Defaults to true. */
  stopOnFail?: boolean;
  /** The working directory to run commands from. Will be created if it doesn't exist. */
  cwd?: string;
}
