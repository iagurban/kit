# Type Alias: UnwrapArray\<T\>

```ts
type UnwrapArray<T> = T extends infer R[] ? R : T;
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:93](https://github.com/iagurban/kit/blob/e56ef98e829a034a16c52135f2f52db2a2e4fad8/src/core/types.ts#L93)

A utility type that extracts the type of elements from an array type.
If the provided type is an array type, it returns the type of its elements.
Otherwise, it returns the type itself.

## Type Parameters

### T

`T`

The type to be evaluated.
