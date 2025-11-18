# Function: isROArray()

```ts
function isROArray<A>(a): a is readonly A[];
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:161](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/checks.ts#L161)

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
