# Function: findNodeOfType()

```ts
function findNodeOfType<T>(n, nodeName): T | null;
```

Defined in: [html.ts:9](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/react/html.ts#L9)

Recursively searches for a node of the specified type within a given element's descendants.

## Type Parameters

### T

`T` *extends* `Element`

The specific type of the node to be returned, extending the base Element type.

## Parameters

### n

`Element`

The starting element to begin the search from.

### nodeName

`string`

The name of the node to search for (case-sensitive).

## Returns

`T` \| `null`

- Returns the first matching node cast to the specified type, or null if no match is found.
