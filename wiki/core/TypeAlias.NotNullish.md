# Type Alias: NotNullish\<T\>

```ts
type NotNullish<T> = Exclude<T, Nullish>;
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/types.ts:49](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/core/utils/types.ts#L49)

A utility type that excludes `null` and `undefined` from a given type `T`.

This type alias is helpful when you want to ensure that a value cannot be nullish
(i.e., neither null nor undefined) and must be of a concrete value type.

## Type Parameters

### T

`T`

The type from which `null` and `undefined` will be excluded.
