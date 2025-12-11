# Variable: isIterableIterator()

```ts
const isIterableIterator: (value) => value is IterableIterator<unknown, any, any>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-iterable-iterator.ts:11](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-iterable-iterator.ts#L11)

Checker that determines whether a value is an `IterableIterator`.

## Parameters

### value

`unknown`

The value to check.

## Returns

`value is IterableIterator<unknown, any, any>`

True if the value is both iterable and an iterator, otherwise false.
