# Variable: isUndefined()

```ts
const isUndefined: (o) => o is undefined;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:90](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/core/checks.ts#L90)

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
