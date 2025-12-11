# Variable: isPromise()

```ts
const isPromise: (value) => value is Promise<unknown>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-promise.ts:13](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-promise.ts#L13)

Checker that determines whether a value is a Promise or thenable with full Promise API.

Fast-path checks native `Promise` instances, then falls back to objects that
provide callable `then`, `catch`, and `finally` methods.

## Parameters

### value

`unknown`

The value to check.

## Returns

`value is Promise<unknown>`

True if the value behaves like a Promise, otherwise false.
