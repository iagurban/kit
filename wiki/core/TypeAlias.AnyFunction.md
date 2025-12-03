# Type Alias: AnyFunction()\<R\>

```ts
type AnyFunction<R> = (...a) => R;
```

Defined in: [IdeaProjects/kit/kit/src/core/types.ts:151](https://github.com/iagurban/kit/blob/bb29e09514172887133828d44e7dea0c857e22da/src/core/types.ts#L151)

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
