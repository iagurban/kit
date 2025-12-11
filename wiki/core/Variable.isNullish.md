# Variable: isNullish()

```ts
const isNullish: (o) => o is null | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/basic.ts:78](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/basic.ts#L78)

Determines whether the given value is null or undefined.

This utility function checks if a value is either strictly `null` or `undefined`
and returns a boolean result. It utilizes loose equality to handle both cases.

## Parameters

### o

`unknown`

The value to be checked.

## Returns

o is null \| undefined

- `true` if the value is null or undefined, otherwise `false`.
