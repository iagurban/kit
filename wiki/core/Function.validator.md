# Function: validator()

```ts
function validator<K>(isK): <R>(o, fn) => R;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:283](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/core/checks.ts#L283)

A higher-order function that validates an input against a specified checker function
and applies a transformation function if the validation is successful.

## Type Parameters

### K

`K`

The type to validate the input against.

## Parameters

### isK

[`Checker`](TypeAlias.Checker.md)\<`K`\>

A function used to verify if the input matches the specified type or criteria. The `isK.type` property is used to describe the type in error messages.

## Returns

A function that takes an input value to validate and a transformation function to apply if the input is valid.

```ts
<R>(o, fn): R;
```

### Type Parameters

#### R

`R`

### Parameters

#### o

`unknown`

#### fn

(`o`) => `R`

### Returns

`R`

## Throws

Throws an error if the input validation fails, including the expected type (if available) and the actual input value.
