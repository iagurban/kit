# Function: findNodeBy()

```ts
function findNodeBy<T>(n, is): T | null;
```

Defined in: [html.ts:30](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/react/html.ts#L30)

Recursively searches for and returns a node within the DOM tree that satisfies a specified condition.

## Type Parameters

### T

`T` *extends* `Element`

The type of element to be returned.

## Parameters

### n

`Element`

The root element to start the search from.

### is

(`e`) => `boolean`

A callback function that takes an element as an argument and returns a boolean indicating whether the element matches the desired condition.

## Returns

`T` \| `null`

- Returns the first element of type T that matches the condition, or null if no matching element is found.
