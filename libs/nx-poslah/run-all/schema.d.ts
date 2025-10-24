export interface RunAllExecutorSchema {
  /**
   * Run in CI mode, using 'nx run-many' instead of 'concurrently'.
   */
  ci?: boolean;
  /**
   * The target to run on all projects.
   */
  target: string;
  /**
   * The configuration to use when running the target.
   */
  configuration?: string;
  /**
   * Filter projects by tags.
   */
  tags?: string[];
  /**
   * A list of projects to run.
   */
  include?: string[];
  /**
   * A list of projects to exclude.
   */
  exclude?: string[];
  /**
   * Additional arguments to pass to the 'nx run' command.
   */
  args?: string;
  /**
   * Colorize the output.
   */
  colorize?: boolean;
  /**
   * A regex to extract a label from the project name.
   */
  labelRegex?: string;
  /**
   * Environment variables to set for the command.
   */
  env?: Record<string, string>;
}
