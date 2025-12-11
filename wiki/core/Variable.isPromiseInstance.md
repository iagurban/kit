# Variable: isPromiseInstance()

```ts
const isPromiseInstance: (value) => value is Promise<unknown>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-promise-instance.ts:9](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-promise-instance.ts#L9)

Checker that determines whether a value is a native `Promise` instance.

## Parameters

### value

`unknown`

The value to check.

## Returns

`value is Promise<unknown>`

True if the value is an instance of `Promise`, otherwise false.
