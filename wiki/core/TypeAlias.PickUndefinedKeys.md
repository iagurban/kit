# Type Alias: PickUndefinedKeys\<T\>

```ts
type PickUndefinedKeys<T> = { [K in keyof T as T[K] extends undefined ? K : never]: true };
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:126](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/types.ts#L126)

A utility type that generates a new type by picking keys from a given type `T`
where the corresponding properties are strictly of the `undefined` type.

The resulting type will have the keys set to `true` if their associated values in `T`
are strictly `undefined`.

## Type Parameters

### T

`T`

The type from which keys with `undefined` values will be picked.
