# Variable: isUndefined()

```ts
const isUndefined: (o) => o is undefined;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/basic.ts:55](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/basic.ts#L55)

A type guard function to determine if a given value is undefined.

This function checks if the provided value is strictly equal to `undefined`.
It can be used to refine the type of a variable to `undefined` in TypeScript.

## Parameters

### o

`unknown`

The value to check.

## Returns

`o is undefined`

True if the value is `undefined`, otherwise false.
