# Function: isTuples()

```ts
function isTuples<Vs>(...items): Checker<Vs[]>;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:268](https://github.com/iagurban/kit/blob/8ed9974b40a00d80dd9ba7a56ab347e7cbde291d/src/core/checks.ts#L268)

Determines if a given array adheres strictly to a tuple structure based on provided type checkers.

The function checks if the input array matches the expected type structure as defined
by an array of type checkers. Each element of the array must conform to the corresponding
type checker in the same position.

## Type Parameters

### Vs

`Vs` *extends* readonly `unknown`[]

## Parameters

### items

...[`Checkers`](TypeAlias.Checkers.md)\<`Vs`\>

A list of type checkers corresponding to each element of the expected tuple.

## Returns

[`Checker`](TypeAlias.Checker.md)\<`Vs`[]\>

Returns `true` if the array matches the tuple structure, otherwise `false`.
