# Function: warnCatch()

```ts
function warnCatch(fn): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/flow/catching.ts:79](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/flow/catching.ts#L79)

Executes a provided function and catches any thrown errors, logging them as warnings.

## Parameters

### fn

() => `unknown`

A function to be executed. It may throw an error.

## Returns

`void`
