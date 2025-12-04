# Function: validator0()

```ts
function validator0<K>(isK): (o) => K;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:338](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/checks.ts#L338)

A higher-order function that creates a validator for performing runtime type checks on an input.
The validator applies the provided type checker and throws an error if the type check fails.

## Type Parameters

### K

`K`

The type to be checked.

## Parameters

### isK

[`Checker`](TypeAlias.Checker.md)\<`K`\>

A type checker function that determines whether the input matches the expected type.

## Returns

A validation function that validates the input and either returns the validated value or throws an error.

```ts
(o): K;
```

### Parameters

#### o

`unknown`

### Returns

`K`

## Throws

If the input does not pass the provided type check.
