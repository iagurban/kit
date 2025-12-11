# Function: scaleFrom01()

```ts
function scaleFrom01(
   v, 
   min, 
   max): number;
```

Defined in: [IdeaProjects/kit/kit/src/core/numbers/utils.ts:26](https://github.com/iagurban/kit/blob/1e781a5487ee363602a36fe6fd9858d348e2b67a/src/core/numbers/utils.ts#L26)

Scales a value from a normalized range [0, 1] to a specified range [min, max].

## Parameters

### v

`number`

The value to be scaled, assumed to be in the range [0, 1].

### min

`number`

The lower bound of the target range.

### max

`number`

The upper bound of the target range.

## Returns

`number`

The scaled value in the range [min, max].
