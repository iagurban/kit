# Type Alias: NotNullish\<T\>

```ts
type NotNullish<T> = Exclude<T, Nullish>;
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:49](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/core/types.ts#L49)

A utility type that excludes `null` and `undefined` from a given type `T`.

This type alias is helpful when you want to ensure that a value cannot be nullish
(i.e., neither null nor undefined) and must be of a concrete value type.

## Type Parameters

### T

`T`

The type from which `null` and `undefined` will be excluded.
