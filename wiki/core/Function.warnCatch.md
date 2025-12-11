# Function: warnCatch()

```ts
function warnCatch(fn): void;
```

Defined in: [IdeaProjects/kit/kit/src/core/flow/catching.ts:79](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/flow/catching.ts#L79)

Executes a provided function and catches any thrown errors, logging them as warnings.

## Parameters

### fn

() => `unknown`

A function to be executed. It may throw an error.

## Returns

`void`
