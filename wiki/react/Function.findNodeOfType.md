# Function: findNodeOfType()

```ts
function findNodeOfType<T>(n, nodeName): T | null;
```

Defined in: [html.ts:9](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/react/html.ts#L9)

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
