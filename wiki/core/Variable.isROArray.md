# Variable: isROArray()

```ts
const isROArray: <A>(a) => a is readonly A[];
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/basic.ts:127](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/basic.ts#L127)

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
