# Function: isMounted()

```ts
function isMounted(node): boolean;
```

Defined in: [html.ts:53](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/react/html.ts#L53)

Checks if a given HTML element is mounted to the DOM.

This function determines whether the specified HTML element is part of the document's
node tree, either directly or through one of its parent elements, ensuring it is connected
to the document and therefore "mounted."

## Parameters

### node

`HTMLElement`

The HTML element to be checked for its mounted status.

## Returns

`boolean`

True if the element is mounted to the DOM, false otherwise.
