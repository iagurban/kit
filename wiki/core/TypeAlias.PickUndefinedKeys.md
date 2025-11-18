# Type Alias: PickUndefinedKeys\<T\>

```ts
type PickUndefinedKeys<T> = { [K in keyof T as T[K] extends undefined ? K : never]: true };
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/types.ts:125](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/core/utils/types.ts#L125)

A utility type that generates a new type by picking keys from a given type `T`
where the corresponding properties are strictly of the `undefined` type.

The resulting type will have the keys set to `true` if their associated values in `T`
are strictly `undefined`.

## Type Parameters

### T

`T`

The type from which keys with `undefined` values will be picked.
