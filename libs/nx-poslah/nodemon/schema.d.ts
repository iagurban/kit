export interface NodemonExecutorSchema {
  script?: string;
  exec?: string;
  scriptArgs?: string[];
  watch?: string[];
  ignore?: string[];
  ext?: string;
  config?: string;
  verbose?: boolean;
  cwd?: string;
  runner?: string;
}
