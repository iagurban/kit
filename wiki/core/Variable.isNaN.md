# Variable: isNaN()

```ts
const isNaN: (o) => o is number;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-nan.ts:7](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-nan.ts#L7)

Checks specifically for NaN (typeof number AND is NaN).
Use this if you actually want to allow NaN: isSomeOf(isNumber, isNaN)

## Parameters

### o

`unknown`

## Returns

`o is number`
