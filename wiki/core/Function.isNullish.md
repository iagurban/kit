# Function: isNullish()

```ts
function isNullish(o): o is null | undefined;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:92](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/core/checks.ts#L92)

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
