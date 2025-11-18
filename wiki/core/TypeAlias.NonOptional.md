# Type Alias: NonOptional\<T\>

```ts
type NonOptional<T> = Pick<T, RequiredKeys<T>>;
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/types.ts:83](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/core/utils/types.ts#L83)

A utility type that creates a new type by extracting all required (non-optional) properties
from the given type `T`. The resulting type includes only the keys of `T` that are not marked
as optional.

This type is useful for creating stricter types out of existing types by filtering out any
properties that allow undefined or are not mandatory.

## Type Parameters

### T

`T`

The source type from which required keys should be extracted.
