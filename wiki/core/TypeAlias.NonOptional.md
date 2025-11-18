# Type Alias: NonOptional\<T\>

```ts
type NonOptional<T> = Pick<T, RequiredKeys<T>>;
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:83](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/types.ts#L83)

A utility type that creates a new type by extracting all required (non-optional) properties
from the given type `T`. The resulting type includes only the keys of `T` that are not marked
as optional.

This type is useful for creating stricter types out of existing types by filtering out any
properties that allow undefined or are not mandatory.

## Type Parameters

### T

`T`

The source type from which required keys should be extracted.
