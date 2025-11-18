# Type Alias: UnwrapArray\<T\>

```ts
type UnwrapArray<T> = T extends infer R[] ? R : T;
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/types.ts:92](https://github.com/iagurban/kit/blob/88f6c87858ca712c618c2fee11d3d113250c16fc/src/core/utils/types.ts#L92)

A utility type that extracts the type of elements from an array type.
If the provided type is an array type, it returns the type of its elements.
Otherwise, it returns the type itself.

## Type Parameters

### T

`T`

The type to be evaluated.
