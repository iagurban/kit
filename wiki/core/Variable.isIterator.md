# Variable: isIterator()

```ts
const isIterator: (value) => value is Iterator<unknown, any, any>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-iterator.ts:9](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-iterator.ts#L9)

Checker that determines whether a value is an iterator (has a callable `next`).

## Parameters

### value

`unknown`

The value to check.

## Returns

`value is Iterator<unknown, any, any>`

True if the value has a `next` method, otherwise false.
