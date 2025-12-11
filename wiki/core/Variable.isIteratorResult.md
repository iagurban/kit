# Variable: isIteratorResult()

```ts
const isIteratorResult: (value) => value is IteratorResult<unknown, any>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-iterator-result.ts:9](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-iterator-result.ts#L9)

Checker that determines whether a value is an `IteratorResult`.

## Parameters

### value

`unknown`

The value to check.

## Returns

`value is IteratorResult<unknown, any>`

True if the value has a `value` field and boolean `done`, otherwise false.
