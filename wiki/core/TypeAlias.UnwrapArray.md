# Type Alias: UnwrapArray\<T\>

```ts
type UnwrapArray<T> = T extends infer R[] ? R : T;
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:93](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/types.ts#L93)

A utility type that extracts the type of elements from an array type.
If the provided type is an array type, it returns the type of its elements.
Otherwise, it returns the type itself.

## Type Parameters

### T

`T`

The type to be evaluated.
