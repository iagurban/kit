# Type Alias: Checker\<T\>

```ts
type Checker<T> = (o) => o is T & object;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:15](https://github.com/iagurban/kit/blob/8b774e0e19a5bd4b27ec02cbd39cc62b919e327f/src/core/checks.ts#L15)

A type definition for a utility function that determines whether a given value
matches a specific type T. The `Checker` type is both a function and an object.

The function aspect takes an input of any type (`unknown`) and returns a boolean
indicating whether the input is of type T.

The object aspect includes an optional `type` property, which can be a string
representing the name or identifier of the type being checked.

## Type Declaration

### type?

```ts
optional type: string;
```

## Type Parameters

### T

`T`

The type that the checker function validates against.
