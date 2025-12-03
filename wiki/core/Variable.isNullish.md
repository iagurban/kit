# Variable: isNullish()

```ts
const isNullish: (o) => o is null | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:113](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/checks.ts#L113)

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
