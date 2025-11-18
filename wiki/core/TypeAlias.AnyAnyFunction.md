# Type Alias: AnyAnyFunction()\<R\>

```ts
type AnyAnyFunction<R> = (...args) => R;
```

Defined in: [IdeaProjects/kit/kit/src/core/utils/types.ts:176](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/core/utils/types.ts#L176)

A type definition for a function that accepts any number of arguments
of any type and returns a value of type R.

This is a generic type where:
- R represents the return type of the function and defaults to any.

Note:
- This type is intentionally permissive and allows arguments and return values
  of any type. Use with caution as it bypasses type safety guarantees.

## Type Parameters

### R

`R` = `any`

## Parameters

### args

...`any`[]

## Returns

`R`
