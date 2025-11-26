# Type Alias: NotNullish\<T\>

```ts
type NotNullish<T> = Exclude<T, Nullish>;
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:49](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/core/types.ts#L49)

A utility type that excludes `null` and `undefined` from a given type `T`.

This type alias is helpful when you want to ensure that a value cannot be nullish
(i.e., neither null nor undefined) and must be of a concrete value type.

## Type Parameters

### T

`T`

The type from which `null` and `undefined` will be excluded.
