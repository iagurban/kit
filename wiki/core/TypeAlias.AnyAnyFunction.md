# Type Alias: AnyAnyFunction()\<R\>

```ts
type AnyAnyFunction<R> = (...args) => R;
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:177](https://github.com/iagurban/kit/blob/fa9fa6938de45d521729171297aa5a63ad08fac8/src/core/types.ts#L177)

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
