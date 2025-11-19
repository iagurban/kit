# Type Alias: NotNullish\<T\>

```ts
type NotNullish<T> = Exclude<T, Nullish>;
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:49](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/types.ts#L49)

A utility type that excludes `null` and `undefined` from a given type `T`.

This type alias is helpful when you want to ensure that a value cannot be nullish
(i.e., neither null nor undefined) and must be of a concrete value type.

## Type Parameters

### T

`T`

The type from which `null` and `undefined` will be excluded.
