# Type Alias: AnyAnyFunction()\<R\>

```ts
type AnyAnyFunction<R> = (...args) => R;
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:176](https://github.com/iagurban/kit/blob/6e66fe680955a3080903eeaad4a49a9a0b2845a0/src/core/types.ts#L176)

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
