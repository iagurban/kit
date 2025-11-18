# Type Alias: ValOrArr\<T\>

```ts
type ValOrArr<T> = T | readonly T[];
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:28](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/types.ts#L28)

Represents a type that can either be a single value of type `T` or a readonly array of values of type `T`.

This type is useful for scenarios where an input or output can accept or return a singular value or
multiple values in the form of an array.

## Type Parameters

### T

`T`

The type of the value or the elements in the array.
