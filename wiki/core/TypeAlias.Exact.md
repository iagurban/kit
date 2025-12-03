# Type Alias: Exact\<T\>

```ts
type Exact<T> = { [K in keyof T]: T[K] };
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:164](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/types.ts#L164)

A utility type that maps an object type `T` to another object type where all the properties
of `T` are preserved exactly as they are, ensuring no additional or removed properties.

The `Exact` type is often used to enforce stricter object typing by ensuring that the resulting
type matches the keys and values of the provided object `T` explicitly.

## Type Parameters

### T

`T` *extends* `object`

The input object type to be mapped exactly.
