# Variable: isMap()

```ts
const isMap: <K, V>(o) => o is Map<K, V>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/basic.ts:110](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/basic.ts#L110)

Checks if the provided value is a Map.

## Type Parameters

### K

`K`

### V

`V`

## Parameters

### o

`unknown`

The value to be checked.

## Returns

`o is Map<K, V>`

Returns true if the input is a Map, otherwise false.
