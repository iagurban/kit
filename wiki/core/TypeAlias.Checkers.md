# Type Alias: Checkers\<Vs\>

```ts
type Checkers<Vs> = { [K in keyof Vs]: (o: unknown) => o is Vs[K] };
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:213](https://github.com/iagurban/kit/blob/8f103f270ee7e07174f3b99efd44fc39c626cbff/src/core/checks.ts#L213)

A utility type that represents a collection of type-checking functions.
Each function in the collection determines whether a given value matches
its associated type in the input tuple provided as a generic parameter.

## Type Parameters

### Vs

`Vs` *extends* readonly `unknown`[]

A tuple of types that define the type-checking functions.
Each function in the resulting object corresponds to a type in the tuple,
verifying if a value conforms to that specific type.
