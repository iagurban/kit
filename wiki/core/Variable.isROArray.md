# Variable: isROArray()

```ts
const isROArray: <A>(a) => a is readonly A[];
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:189](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/checks.ts#L189)

Determines if the provided value is a read-only array.

## Type Parameters

### A

`A`

## Parameters

### a

`unknown`

The value to be checked.

## Returns

`a is readonly A[]`

True if the value is a read-only array; otherwise, false.
