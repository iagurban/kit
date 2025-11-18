# Type Alias: RequiredKeys\<T\>

```ts
type RequiredKeys<T> = { [K in keyof T]: {} extends { [P in K]: T[K] } ? never : K }[keyof T];
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/types.ts:69](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/core/utils/types.ts#L69)

A utility type that extracts the required keys of a given type `T`.

The `RequiredKeys` type examines each key `K` in the type `T` to determine
if the property is required or optional. It includes the key `K` in the resulting
type only if the property is required.

A key is considered required if the type `{}` is not assignable to `{ [P in K]: T[K] }`.

Usage:
- Use this type to infer or extract the keys of an object type that are required.

This type is particularly useful for working with strongly-typed objects where
distinguishing between optional and required properties is necessary.

## Type Parameters

### T

`T`

The type for which required keys will be computed.

## Returns

A union type of the required keys of `T`.
