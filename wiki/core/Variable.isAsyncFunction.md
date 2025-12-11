# Variable: isAsyncFunction()

```ts
const isAsyncFunction: (value) => value is AnyFunction<Promise<unknown>>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-async-function.ts:10](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-async-function.ts#L10)

Checker that determines whether a value is an async function.

## Parameters

### value

`unknown`

The value to check.

## Returns

`value is AnyFunction<Promise<unknown>>`

True if the value is an async function, otherwise false.
