# Function: validator()

```ts
function validator<K>(isK): <R>(o, fn) => R;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/validator.ts:15](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/validator.ts#L15)

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
