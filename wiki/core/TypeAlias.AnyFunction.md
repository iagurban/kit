# Type Alias: AnyFunction()\<R\>

```ts
type AnyFunction<R> = (...a) => R;
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:150](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/types.ts#L150)

Represents a type for any function. It can accept any number of arguments of any type and return a value of a specified type.

## Type Parameters

### R

`R` = `unknown`

The type of the return value of the function. Defaults to `unknown` if not specified.

## Parameters

### a

...readonly `any`[]

## Returns

`R`
