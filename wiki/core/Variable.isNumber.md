# Variable: isNumber()

```ts
const isNumber: (value) => value is number;
```

Defined in: [IdeaProjects/kit/kit/src/core/checks/is-number.ts:10](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/checks/is-number.ts#L10)

Checker that determines whether a value is a valid number
(typeof `number` and not `NaN`).

## Parameters

### value

`unknown`

The value to check.

## Returns

`value is number`

True if the value is a number and not `NaN`, otherwise false.
