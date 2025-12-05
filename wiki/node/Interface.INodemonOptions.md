# Interface: INodemonOptions

Defined in: [IdeaProjects/kit/kit/src/node/nodemon.ts:441](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/node/nodemon.ts#L441)

Options for Nodemon.

## Properties

### cwd? {#cwd}

```ts
optional cwd: string | null;
```

Defined in: [IdeaProjects/kit/kit/src/node/nodemon.ts:497](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/node/nodemon.ts#L497)

Current working directory.

***

### delay? {#delay}

```ts
optional delay: number;
```

Defined in: [IdeaProjects/kit/kit/src/node/nodemon.ts:457](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/node/nodemon.ts#L457)

Delay in milliseconds before restarting.

***

### dirsCheckInterval? {#dirscheckinterval}

```ts
optional dirsCheckInterval: number;
```

Defined in: [IdeaProjects/kit/kit/src/node/nodemon.ts:469](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/node/nodemon.ts#L469)

Interval in milliseconds to check for directory changes.

***

### exec {#exec}

```ts
exec: 
  | string
  | {
  args?: string[];
  command: string;
};
```

Defined in: [IdeaProjects/kit/kit/src/node/nodemon.ts:461](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/node/nodemon.ts#L461)

Command to execute.

***

### extensions? {#extensions}

```ts
optional extensions: string[] | null;
```

Defined in: [IdeaProjects/kit/kit/src/node/nodemon.ts:453](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/node/nodemon.ts#L453)

File extensions to watch.

***

### filesCheckInterval? {#filescheckinterval}

```ts
optional filesCheckInterval: number;
```

Defined in: [IdeaProjects/kit/kit/src/node/nodemon.ts:465](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/node/nodemon.ts#L465)

Interval in milliseconds to check for file changes.

***

### ignore? {#ignore}

```ts
optional ignore: string[];
```

Defined in: [IdeaProjects/kit/kit/src/node/nodemon.ts:449](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/node/nodemon.ts#L449)

Patterns to ignore.

***

### killSignal? {#killsignal}

```ts
optional killSignal: number | Signals;
```

Defined in: [IdeaProjects/kit/kit/src/node/nodemon.ts:477](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/node/nodemon.ts#L477)

Signal to send to kill the process.

***

### log? {#log}

```ts
optional log: LogFunction;
```

Defined in: [IdeaProjects/kit/kit/src/node/nodemon.ts:501](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/node/nodemon.ts#L501)

A function to use for logging.

***

### logChangedFiles? {#logchangedfiles}

```ts
optional logChangedFiles: boolean;
```

Defined in: [IdeaProjects/kit/kit/src/node/nodemon.ts:489](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/node/nodemon.ts#L489)

Whether to log changed files.

***

### logTrackedFiles? {#logtrackedfiles}

```ts
optional logTrackedFiles: boolean;
```

Defined in: [IdeaProjects/kit/kit/src/node/nodemon.ts:493](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/node/nodemon.ts#L493)

Whether to log tracked files.

***

### reGlobbingInterval? {#reglobbinginterval}

```ts
optional reGlobbingInterval: number;
```

Defined in: [IdeaProjects/kit/kit/src/node/nodemon.ts:473](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/node/nodemon.ts#L473)

Interval in milliseconds to re-glob for files.

***

### spawnOptions? {#spawnoptions}

```ts
optional spawnOptions: SpawnOptions;
```

Defined in: [IdeaProjects/kit/kit/src/node/nodemon.ts:481](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/node/nodemon.ts#L481)

Options for spawning the process.

***

### verbose? {#verbose}

```ts
optional verbose: boolean;
```

Defined in: [IdeaProjects/kit/kit/src/node/nodemon.ts:485](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/node/nodemon.ts#L485)

Whether to log verbose output.

***

### watch {#watch}

```ts
watch: string[];
```

Defined in: [IdeaProjects/kit/kit/src/node/nodemon.ts:445](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/node/nodemon.ts#L445)

Patterns to watch for changes.
