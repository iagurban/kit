import { SpawnOptions } from 'child_process';

export interface NodemonExecutorSchema {
  script?: string;
  exec?: string;
  scriptArgs?: string[];
  watch: string[];
  ignore?: string[];
  ext?: string;
  verbose?: boolean;
  cwd?: string;
  runner?: string;
  delay?: number;
  signal?: string;
  logChangedFiles?: boolean;
  logTrackedFiles?: boolean;
  filesCheckInterval?: number;
  dirsCheckInterval?: number;
  spawnOptions?: SpawnOptions;
}
