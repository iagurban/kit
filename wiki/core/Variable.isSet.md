# Variable: isSet()

```ts
const isSet: <T>(o) => o is Set<T>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/basic.ts:118](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/basic.ts#L118)

Checks if the provided value is a Set.

## Type Parameters

### T

`T`

## Parameters

### o

`unknown`

The value to be checked.

## Returns

`o is Set<T>`

Returns true if the input is a Set, otherwise false.
