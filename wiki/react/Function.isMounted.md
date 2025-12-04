# Function: isMounted()

```ts
function isMounted(node): boolean;
```

Defined in: [html.ts:53](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/react/html.ts#L53)

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
