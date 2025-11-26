# Type Alias: AnyAnyFunction()\<R\>

```ts
type AnyAnyFunction<R> = (...args) => R;
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:177](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/core/types.ts#L177)

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
