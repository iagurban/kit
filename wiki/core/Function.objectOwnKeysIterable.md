# Function: objectOwnKeysIterable()

```ts
function objectOwnKeysIterable(obj): IterableIterator<string>;
```

Defined in: [IdeaProjects/kit/kit/src/core/collections/object-utils.ts:125](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/collections/object-utils.ts#L125)

Returns a lazy iterable for the object's own enumerable string properties.
*

## Parameters

### obj

The object to iterate over. Can be null or undefined (safe no-op).

`object` | `null` | `undefined`

## Returns

`IterableIterator`\<`string`\>

An iterator that yields property keys as strings.
