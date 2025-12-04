# Variable: isNumber()

```ts
const isNumber: (o) => o is number;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:133](https://github.com/iagurban/kit/blob/78aea32be2811f93b17aa1de9430feb1fbc049c8/src/core/checks.ts#L133)

Checks if the provided value is of type number.

This function determines whether the given input is a JavaScript number.
It performs a strict type check and returns true if the input is a number,
otherwise it returns false.

## Parameters

### o

`unknown`

The value to be checked.

## Returns

`o is number`

- True if the input is a number, otherwise false.
