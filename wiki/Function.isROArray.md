# Function: isROArray()

```ts
function isROArray<A>(a): a is readonly A[];
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:161](https://github.com/iagurban/kit/blob/66158ab4ff046dedabe090e7b48602e7bdbe2bcf/src/core/checks.ts#L161)

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
