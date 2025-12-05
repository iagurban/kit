# Type Alias: ValOrArr\<T\>

```ts
type ValOrArr<T> = T | readonly T[];
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:28](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/core/types.ts#L28)

Represents a type that can either be a single value of type `T` or a readonly array of values of type `T`.

This type is useful for scenarios where an input or output can accept or return a singular value or
multiple values in the form of an array.

## Type Parameters

### T

`T`

The type of the value or the elements in the array.
