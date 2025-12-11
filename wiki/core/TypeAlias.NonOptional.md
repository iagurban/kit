# Type Alias: NonOptional\<T\>

```ts
type NonOptional<T> = Pick<T, RequiredKeys<T>>;
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:84](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/types.ts#L84)

A utility type that creates a new type by extracting all required (non-optional) properties
from the given type `T`. The resulting type includes only the keys of `T` that are not marked
as optional.

This type is useful for creating stricter types out of existing types by filtering out any
properties that allow undefined or are not mandatory.

## Type Parameters

### T

`T`

The source type from which required keys should be extracted.
