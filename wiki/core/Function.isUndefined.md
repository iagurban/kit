# Function: isUndefined()

```ts
function isUndefined(o): o is undefined;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:69](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/core/checks.ts#L69)

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
