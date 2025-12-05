# Function: isNumber()

```ts
function isNumber(o): o is number;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks.ts:112](https://github.com/iagurban/kit/blob/ec465b6e47e708a8ef4d0428d6692d00149ad444/src/core/checks.ts#L112)

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
