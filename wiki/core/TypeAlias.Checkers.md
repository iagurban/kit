# Type Alias: Checkers\<Vs\>

```ts
type Checkers<Vs> = { [K in keyof Vs]: (o: unknown) => o is Vs[K] };
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:248](https://github.com/iagurban/kit/blob/ec465b6e47e708a8ef4d0428d6692d00149ad444/src/core/checks.ts#L248)

A utility type that represents a collection of type-checking functions.
Each function in the collection determines whether a given value matches
its associated type in the input tuple provided as a generic parameter.

## Type Parameters

### Vs

`Vs` *extends* readonly `unknown`[]

A tuple of types that define the type-checking functions.
Each function in the resulting object corresponds to a type in the tuple,
verifying if a value conforms to that specific type.
